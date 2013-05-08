var url = require('url');
var emptygif = require('emptygif');
var redis = require('redis');
var _ = require('underscore');
var redisConfig = require('../config.js').redis;

var client = redis.createClient.apply(this, redisConfig);

var TWO_WEEKS = 14 * 24 * 60 * 60;
var QUEUE = 'logstash';
var PARAM = process.env.PARAM || 'q';
var REFERER_PARAM = process.env.REFERER_PARAM || 'r';

function template (guid, errors, referer, ua, ip) {
    return {
        base: {
            '@timestamp': new Date().toISOString(),
            '@type': 'browser-error',
            '@tags': ['browser', 'js', 'error'],
            '@source': referer,
            '@fields': {
                id: guid,
                ua: ua,
                ip: ip
            }
        },
        errors: errors
    };
}

function processMsg (string, referer, ua, ip) {
    process.nextTick(function () {
        var input = JSON.parse(decodeURI(string));
        var guid = input[0];
        var errors = input[1];
        var tmpl = template(guid, errors, referer, ua, ip);
        if (input.length === 3) {
            if (_.isArray(input[2])) {
                return save(guid, input[2], tmpl);
            } else {
                return check(guid, tmpl);
            }
        } else {
            return expand(tmpl);
        }
    });
}

function send (msg) {
    client.rpush(QUEUE, JSON.stringify(msg));
}

function expand (tmpl) {
    tmpl.errors.forEach(function (el) {
        send(_.extend({}, tmpl.base, {
            '@message': el[0],
            '@fields': _.extend({}, tmpl.base['@fields'], {
                script: el[1],
                line: el[2]
            })
        }));
    });
}

function save (id, modernizr, msg) {
    client.set(id, JSON.stringify(modernizr));
    client.expire(id, TWO_WEEKS);
    msg.base['@fields'].can = modernizr[0];
    msg.base['@fields'].cant = modernizr[1];
    return expand(msg);
}

function check (id, msg) {
    client.get(id, function (err, reply) {
        if (err) {
            return console.error('error response - ' + err);
        }
        if (reply === null) {
            return expand(msg);
        }
        var modernizr = JSON.parse(reply);
        msg.base['@fields'].can = modernizr[0];
        msg.base['@fields'].cant = modernizr[1];
        return expand(msg);
    });
}

exports.post = function (req, res) {
    if (req.body[PARAM] !== undefined && req.body[PARAM] !== '' && req.body[REFERER_PARAM] !== undefined && req.body[REFERER_PARAM] !== '') {
        processMsg(req.body[PARAM], req.body[REFERER_PARAM], req.headers['user-agent'], req.connection.remoteAddress);
    }
    res.setHeader('Cache-Control', 'public, max-age=0');
    return res.send('ok');
};

exports.get = function (req, res) {
    var query = url.parse(req.url, true).query;
    if (query[PARAM] !== undefined && query[PARAM] !== '') {
        processMsg(query[PARAM], req.headers['referer'], req.headers['user-agent'], req.connection.remoteAddress);
    }

    emptygif.sendEmptyGif(req, res, {
        'Content-Type' : 'image/gif',
        'Content-Length' : emptygif.emptyGifBufferLength,
        'Cache-Control' : 'public, max-age=0'
    });

};
