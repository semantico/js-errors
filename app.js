
/**
 * Module dependencies.
 */

var express = require('express');
var logger = require('./routes/logger');
var script = require('./routes/script');
var http = require('http');
var path = require('path');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.param(function(name, fn){
    if (fn instanceof RegExp) {
        return function(req, res, next, val){
            var captures;
            if (captures = fn.exec(String(val))) {
                req.params[name] = captures;
                next();
            } else {
                next('route');
            }
        }
    }
});

app.get('/', logger.get);
app.post('/', logger.post);
app.param('buster', /^\d+$/);
app.get('/:buster/errors.js', script.index);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
