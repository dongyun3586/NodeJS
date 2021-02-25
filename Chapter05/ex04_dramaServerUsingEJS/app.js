var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 드라마 목록
var dramaList = [
  {title: '나의 아저씨', actor: '아이유, 이선균'},
  {title: '미스터 션샤인', actor: '김태리, 이병헌'}
]

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('dramaList', {title: 'First EJS Test', list: dramaList});
});

app.post('/', function(req, res){
  if(req.body.title && req.body.actor){
      dramaList.push({title: req.body.title, actor: req.body.actor});
      res.redirect('/');
  }else{
      res.render('dramaList', {title: 'First EJS Test', list: dramaList});
  }
})

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
