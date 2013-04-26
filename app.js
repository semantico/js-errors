
/**
 * Module dependencies.
 */

var express = require('express');
var logger = require('./routes/logger');
var http = require('http');
var path = require('path');
var connect = require('connect');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(connect.compress());
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', logger.get);
app.post('/', logger.post);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
