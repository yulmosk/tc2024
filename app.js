var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tc2024');
var session = require("express-session")


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cats = require('./routes/cats');


var app = express();

// view engine setup
app.engine('ejs',require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var MongoStore = require('connect-mongo');
app.use(session({
  secret: "ThreeCats",
  cookie:{maxAge:60*1000},
  proxy: true,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: 'mongodb://localhost/tc2024'})
}))

app.use(function(req,res,next){
  req.session.counter = req.session.counter + 1 || 1
  next()
  })
  
app.use(require("./middlewares/createMenu.js"))
app.use(require("./middlewares/createUser.js"))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cats', cats);


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
  //res.render('error');
  res.render('error',{title: 'Three Cats'});
});

module.exports = app;
