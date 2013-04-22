var url = require('url');
var emptygif = require('emptygif');

function log(string, referer, ua, ip) {
    console.log(string, referer, ua, ip);
}

exports.post = function (req, res) {
    process.nextTick(function () {
        log(req.body._q, req.headers['referer'], req.headers['user-agent'], req.connection.remoteAddress);
    });
    res.setHeader('Cache-Control', 'public, max-age=0');
    return res.send('');
};

exports.get = function (req, res) {
    var query = url.parse(req.url, true).query;
    process.nextTick(function () {
        log(query._q, req.headers['referer'], req.headers['user-agent'], req.connection.remoteAddress);
    });

    emptygif.sendEmptyGif(req, res, {
        'Content-Type' : 'image/gif',
        'Content-Length' : emptygif.emptyGifBufferLength,
        'Cache-Control' : 'public, max-age=0'
    });

};
