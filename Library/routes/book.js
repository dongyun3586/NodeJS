var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('book', {
    title: 'Library Homepage(Netword and Database Textbook)',
    isLogin: req.session.isLogin, 
    user_email: req.session.user_email,
    user_name: req.session.user_name
  })
});



module.exports = router;