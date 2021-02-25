var express = require('express');
var router = express.Router();

// router도 미들웨어이다.
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.use(function(req, res, next){
  console.log('birds middleware1');
  next()
})

router.use(function(req, res, next){
  console.log('birds middleware2');
  next()
})

router.get('/', function(req, res) {
  res.send('<h1>Birds home page</h1>');
});

router.get('/about', function(req, res) {
  res.send('<h1>About birds</h1>');
});

module.exports = router;