var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var schedulesRouter = require('./routes/schedules');
var registerRouter = require('./routes/register');
var protectedRouter = require('./routes/protected');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//generating a cookie
// trust first proxy enables cookie generation over a http environment. Different for https.
app.set('trust proxy', 1) 
let expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
	secret: 'rajni',
	resave: false,
  saveUninitialized: true,
  expires: expiryDate,
}));

// To parse cookies from the HTTP Request
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/schedules', schedulesRouter);
app.use('/register', registerRouter);
app.use('/protected', protectedRouter);

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

//module.exports = app;

//Create connection to the database



module.exports = {app};
