var url = require('url');
var emptygif = require('emptygif');

function log(string, referer, ua, ip) {
    var msg = JSON.parse(decodeURI(string));
    var guid = msg[0];
    var errors = msg[1];
    if (msg.length === 3) {
        var can = msg[2][0];
        var cant = msg[2][1];
    }
    console.log(guid, errors, referer, ua, ip, can, cant);
}

exports.post = function (req, res) {
    if (req.body.q !== undefined || req.body.q !== '') {
        process.nextTick(function () {
            log(req.body.q, req.headers['referer'], req.headers['user-agent'], req.connection.remoteAddress);
        });
    }
    res.setHeader('Cache-Control', 'public, max-age=0');
    return res.send('');
};

exports.get = function (req, res) {
    var query = url.parse(req.url, true).query;
    if (query.q !== undefined || query.q !== '') {
        process.nextTick(function () {
            log(query.q, req.headers['referer'], req.headers['user-agent'], req.connection.remoteAddress);
        });
    }

    emptygif.sendEmptyGif(req, res, {
        'Content-Type' : 'image/gif',
        'Content-Length' : emptygif.emptyGifBufferLength,
        'Cache-Control' : 'public, max-age=0'
    });

};
