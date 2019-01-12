var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

// session variables and body parser
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This middleware allow us to use req.session.variable = "blah"
// Check the documentation here on how to set it up because there are a couple
// of mandatory options
// https://github.com/expressjs/session
app.use(session({
  secret: "lolcatz",
  resave: false,
  saveUninitialized: true
}));
// we cannot use req.session.variable in the views so we have to use an intermediate
// "local" variable to put this data and pass it to the view
// We can access our session variables from the view through the "session" variable
app.use(function (req, res, next) {
  res.locals.session = req.session;
  res.locals.number = 0;
  next();
});

// app.use(express.static(path.join(__dirname, 'public')));
// basic routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

