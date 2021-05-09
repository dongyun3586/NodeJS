var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('req.session.views: ', req.session.views);
    next();
  });
  
  router.get('/', function(req, res, next) {
    res.render('index', { 
      title: 'Session Test', 
      foo: req.session.views['/foo'], 
      bar: req.session.views['/bar']
    });
  });
  
  router.get('/foo', function (req, res, next) {
    res.redirect('/')
  })
   
  router.get('/bar', function (req, res, next) {
    res.redirect('/')
  })
  
  module.exports = router;
