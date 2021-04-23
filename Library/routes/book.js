var express = require('express');
var router = express.Router();
var model_member = require('../models/memberDAO');
var model_books = require('../models/booksDAO');


/* GET home page. */
router.get('/', function(req, res, next) {
  (async ()=>{
  let booklist = await model_books.selectBookInfo();
  console.log(booklist)
  res.render('search', {
    title: 'Library Homepage(Netword and Database Textbook)',
    isLogin: req.session.isLogin, 
    user_email: req.session.user_email,
    user_name: req.session.user_name,
    booklist: booklist
  })
  })()
});

router.post('/search', (req, res)=>{
  console.log(req.body);
})


module.exports = router;