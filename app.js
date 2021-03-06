var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nib = require('nib');
var stylus = require('stylus');

var new_tests = require('./routes/tests/new');

var index = require('./routes/index');
var new_item = require('./routes/new');
var update = require('./routes/update');
var delete_item = require('./routes/delete');
var get = require('./routes/get');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(stylus.middleware({
  src: path.join(__dirname, 'public/stylesheets'),
  compile: function (str, p) {
    return stylus(str).set('filename', p).use(nib());
  },
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', new_tests);

app.use('/', index);
app.use('/', new_item);
app.use('/', update);
app.use('/', delete_item);
app.use('/', get);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
