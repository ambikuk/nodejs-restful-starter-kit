var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonwebtoken = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

var route = require('./config/Route');
var port = process.env.PORT || 3000;

app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);
	next();
});

route(app);

app.listen(port);