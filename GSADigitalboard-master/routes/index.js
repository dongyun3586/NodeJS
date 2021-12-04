var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  { title: 'Express' , 
    isLogin:req.session.isLogin, 
    userName : req.session.name,
    userEmail: req.session.userEmail});
});

module.exports = router;
