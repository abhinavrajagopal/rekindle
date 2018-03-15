var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv'),
    passport = require('passport'),
    Promise = require('bluebird');

require('./utility/passportStrategy')(passport)

var index = require('./routes/index'),
    dashboard = require('./routes/dashboard'),
    data = require('./routes/data');

// require('./utility/init');

var app = express();

dotenv.config();
mongoose.promise = Promise;
mongoose.connect(process.env.MONGO_URI);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var keys = ['random', 'laptop'],
    expiryDate = new Date( 5 * Date.now() + 60 * 60 * 1000 ); // 5 hours

app.use(require('cookie-session')({
    keys    :  keys,
    secret  : process.env.COOKIE_SECRET || 'cookie-secret',
    cookie  :
    {
        secure: true,
        expires: expiryDate
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/data', data);
app.use('/dashboard', dashboard);

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
