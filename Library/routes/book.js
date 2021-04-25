var express = require('express');
var router = express.Router();
var model_member = require('../models/memberDAO');
var model_books = require('../models/booksDAO');


/* GET home page. */
router.get('/', function(req, res, next) {
  // if(req.session.isLogin) res.redirect('/member/login')
  (async ()=>{
    let booklist = await model_books.selectBookInfoList();
    // console.log(booklist)
    res.render('searchEntry', {
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
  (async ()=>{
    let booklist = await model_books.selectBookList(req.body);
    // console.log(booklist)
    res.render('search', {
      title: 'Library Homepage(Netword and Database Textbook)',
      isLogin: req.session.isLogin, 
      user_email: req.session.user_email,
      user_name: req.session.user_name,
      booklist: booklist
    })
  })()
})

router.get('/rent/:book_code', (req, res)=>{
  // res.send(req.params.book_code)
  var timezoneOffset = new Date().getTimezoneOffset() * 60000; 
  var timezoneDate = new Date(Date.now() - timezoneOffset);
  var rent_datetime = timezoneDate.toISOString().slice(0, 19).replace('T', ' ')
  // console.log(rent_datetime)
  // console.log(req.session.user_email)
  // console.log(req.params.book_code)
  
  model_books.insertRentInfo(rent_datetime, req.session.user_email, req.params.book_code, ()=>{
    model_books.updateRentAllow(req.params.book_code, 1, ()=>{
      res.redirect('/book')
    })
  })

  // (async ()=>{
  //   let results = await model_books.insertRentInfo(rent_datetime, req.session.user_email, req.params.book_code);
  //   res.send(results);
  // })()
})

router.get('/returnbook/:book_code', (req, res)=>{
  var timezoneOffset = new Date().getTimezoneOffset() * 60000; 
  var timezoneDate = new Date(Date.now() - timezoneOffset);
  var return_datetime = timezoneDate.toISOString().slice(0, 19).replace('T', ' ')

  model_books.updateReturnDatetime(req.params.book_code, return_datetime, ()=>{
    model_books.updateRentAllow(req.params.book_code, 0, ()=>{
      res.redirect('/member/modify')
    })
  })
})


module.exports = router;