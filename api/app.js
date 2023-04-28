var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var bodyParser = require("body-parser")

var liveRouter = require('./routes/live');
var indexRouter = require('./routes/index');
var sendmessageRouter = require('./routes/sendmessage');
var usersRouter = require('./routes/users');
var createUserRouter = require('./routes/createuser');
var sessionRouter = require('./routes/session');
var chatRouter = require('./routes/chat');
var otpRouter = require('./routes/otp');
var passwordRouter = require('./routes/password');



var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var exec = require("child_process").exec;


// view engine setup
app.use(bodyParser.json({limit: '1000mb'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sendmessage', sendmessageRouter);
app.use('/createuser', createUserRouter);
app.use('/live', liveRouter);
app.use('/session', sessionRouter);
app.use('/chat', chatRouter);
app.use('/otp', otpRouter);
app.use('/password', passwordRouter);









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
