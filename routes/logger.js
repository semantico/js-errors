var url = require('url');
var emptygif = require('emptygif');
var redis = require('redis');
var _ = require('underscore');

var client = redis.createClient();

var TWO_WEEKS = 14 * 24 * 60 * 60;

function template (guid, errors, referer, ua, ip) {
    return {
        base: {
            timestamp: Math.floor(new Date().getTime() / 1000),
            id: guid,
            referer: referer,
            ua: ua,
            ip: ip
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
            return save(guid, input[2], tmpl);
        }
        return check(guid, tmpl);
    });
}

function send (msg) {
    console.log(msg);
}

function expand (tmpl) {
    tmpl.errors.forEach(function (el) {
        send(_.extend({}, tmpl.base, {
            msg: el[0],
            file: el[1],
            line: el[2]
        }));
    });
}

function save (id, modernizr, msg) {
    client.set(id, JSON.stringify(modernizr));
    client.expire(id, TWO_WEEKS);
    msg.base.can = modernizr[0];
    msg.base.cant = modernizr[1];
    return expand(msg);
}

function check (id, msg) {
    client.get(id, function (err, reply) {
        if (err) {
            return console.error("error response - " + err);
        }
        if (reply === null) {
            return expand(msg);
        }
        var modernizr = JSON.parse(reply);
        msg.base.can = modernizr[0];
        msg.base.cant = modernizr[1];
        return expand(msg);
    });
}

exports.post = function (req, res) {
    if (req.body.q !== undefined && req.body.q !== '' && req.body.r !== undefined && req.body.r !== '') {
        processMsg(req.body.q, req.body.r, req.headers['user-agent'], req.connection.remoteAddress);
    }
    res.setHeader('Cache-Control', 'public, max-age=0');
    return res.send('ok');
};

exports.get = function (req, res) {
    var query = url.parse(req.url, true).query;
    if (query.q !== undefined && query.q !== '') {
        processMsg(query.q, req.headers['referer'], req.headers['user-agent'], req.connection.remoteAddress);
    }

    emptygif.sendEmptyGif(req, res, {
        'Content-Type' : 'image/gif',
        'Content-Length' : emptygif.emptyGifBufferLength,
        'Cache-Control' : 'public, max-age=0'
    });

};
