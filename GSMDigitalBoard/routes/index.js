var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', 
  { 
    isLogin: req.session.isLogin, 
    userEmail: req.session.userEmail 
  });
});

module.exports = router;