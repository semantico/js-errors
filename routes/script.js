var fs = require('fs');
var UglifyJS = require("uglify-js");

var file = './public/javascripts/errors.js';
var original = '';
var script = '';

fs.readFile(file, function (err, data) {
    if (err) throw err;
    var original = data;
    script = UglifyJS.minify('' + data, {
        fromString:true,
        outSourceMap: "out.js.map"
    });
});

exports.index = function (req, res) {
    res.send('(function(){' + script.code + '})();');
};

exports.original = function (req, res) {
    res.send(original);
};
