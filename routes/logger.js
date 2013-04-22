var url  = require('url');

function log(string, ua, ip) {
    console.log(string, ua, ip);
}

exports.post = function (req, res) {
    log(req.body._q, req.headers['user-agent'], req.connection.remoteAddress);
};

exports.get = function (req, res) {
    var query = url.parse(req.url, true).query;
    log(query._q, req.headers['user-agent'], req.connection.remoteAddress);
};
