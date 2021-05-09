var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('req.session: ', req.session);
    next();
  });
  
  router.get('/', function(req, res, next) {
    res.send(`<h1><a href="/session/foo">foo</a></h1> <h1><a href="/session/bar">bar</a></h1>`)
  });
  
  router.get('/foo', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
  })
   
  router.get('/bar', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
  })
  
  module.exports = router;





