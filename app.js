var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

const Promotions = require('./models/promotions');
var Gloves = require('./models/gloves');

var url = 'mongodb+srv://admin:carpediem@average-joes-eg6s5.mongodb.net/average-joes?retryWrites=true&w=majority';
var connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gloveRouter = require('./routes/gloveRouter');
var promotionRouter = require('./routes/promotionRouter');

var app = express();



// Secure traffic only
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  }
  else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gloves', gloveRouter);
app.use('/promotions', promotionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
