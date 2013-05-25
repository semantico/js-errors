var url = require('url');
var emptygif = require('emptygif');

var PARAM = process.env.PARAM || 'q';
var REFERER_PARAM = process.env.REFERER_PARAM || 'r';

var store = {
    body: '',
    referer: ''
};

exports.get = function (req, res) {
    var query = url.parse(req.url, true).query;
    if (query[PARAM] !== undefined && query[PARAM] !== '') {
        store.body = query[PARAM];
        store.referer = req.headers['referer'];
    }
    emptygif.sendEmptyGif(req, res, {
        'Content-Type' : 'image/gif',
        'Content-Length' : emptygif.emptyGifBufferLength,
        'Cache-Control' : 'public, max-age=0'
    });
};

exports.post = function (req, res) {
    if (req.body[PARAM] !== undefined && req.body[PARAM] !== '' && req.body[REFERER_PARAM] !== undefined && req.body[REFERER_PARAM] !== '') {
        store.body = req.body[PARAM];
        store.referer = req.body[REFERER_PARAM];
    }
    res.send('ok');
};

exports.body = function (req, res) {
    res.send(store.body);
};

exports.referer = function (req, res) {
    res.send(store.referer);
};

exports.clear = function (req, res) {
    store.body = '';
    store.referer = '';
};
