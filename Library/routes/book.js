var express = require('express');
var router = express.Router();
var model_member = require('../models/memberDAO');
var model_books = require('../models/booksDAO');


// 도서 검색 GET 요청
router.get('/', function(req, res, next) {
  (async ()=>{
    let booklist = await model_books.selectBookInfoList();
    res.render('searchEntry', {
      isLogin: req.session.isLogin, 
      user_email: req.session.user_email,
      user_name: req.session.user_name,
      booklist: booklist
    })
  })()
});

// 키워드 도서 검색 POST 요청
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

// 도서 대출 요청 처리
router.get('/rent/:book_code', (req, res)=>{
  var timezoneOffset = new Date().getTimezoneOffset() * 60000; 
  var timezoneDate = new Date(Date.now() - timezoneOffset);
  var rent_datetime = timezoneDate.toISOString().slice(0, 19).replace('T', ' ')
  
  model_books.insertRentInfo(rent_datetime, req.session.user_email, req.params.book_code, ()=>{
    model_books.updateRentAllow(req.params.book_code, 1, ()=>{
      res.redirect('/book')
    })
  })
})

// 도서 반납 요청 처리
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