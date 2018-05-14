var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var {connectionCheck} = require('./db/db');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter= require('./routes/api.js');
var mail = require('./sendMail');
var app = express();

mail({to:'wwwprincearora@gmail.com'});


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

//app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(connectionCheck);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(upload.array());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

/*Define Routes here as a middleware*/

app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use('/api',apiRouter);

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
