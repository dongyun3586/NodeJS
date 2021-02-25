var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var parseurl = require('parseurl')
var session = require('express-session')
var favicon = require('serve-favicon')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//#region view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//#endregion

//#region middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//#endregion

//#region session 설정
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  // 해당 페이지를 몇 번 방문했는지를 기억시킬 객체 생성
  if (!req.session.views){ req.session.views = {} }
 
  // count the views
  req.session.views[req.url] = (req.session.views[req.url] || 0) + 1
  console.log(`req.session.views[req.url]: ${req.session.views[req.url]}`)
  next()
})
//#endregion

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
