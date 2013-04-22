var fs = require('fs');
var UglifyJS = require("uglify-js");

var files = [
    './public/javascripts/components/domready/ready.js',
    './public/javascripts/errors.js'
];

var script = UglifyJS.minify(files);

exports.index = function (req, res) {
    res.setHeader('content-type', 'text/javascript; charset=UTF-8');
    res.send(';(function(){' + script.code + '})();');
};
