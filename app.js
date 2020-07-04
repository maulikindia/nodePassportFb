var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');

var app = express();
var db = require('./config/db');
var mongoose = require('mongoose');
mongoose.connect(db.db, { useNewUrlParser: true }, async (err) => {
  if (!err) {
    console.log('DB connection ok.');
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

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'mysecret@123'
}));


//initialize the passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);
app.use('/user', usersRouter);


//import passport configured strategy.
let fbImport = require('./config/passportFb')



//import passport configured strategy.
let passportImport = require('./config/passportTwitter')

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('Server is listening');

module.exports = app;
