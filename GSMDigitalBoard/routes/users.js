var express = require('express');
var router = express.Router();
var model = require('../models/usersDAO');

// 로그인 처리
router.post('/login', (req, res)=>{
  if(req.body.email && req.body.pwd){
    // console.log('req.body: ', req.body);
    model.selectUser(req.body.email, (results)=>{
      //res.send(results[0]);
      // console.log('results: ', results);
      // console.log(req.body.email, results[0].email, req.body.pwd, results[0].pwd)
      // console.log('results', results)
      if(results[0] == undefined){
        res.send('<h1>로그인 실패</h1>')
      }else{
        if(req.body.email === results[0].email && req.body.pwd === results[0].pwd){
          //res.send('<h1>로그인 성공</h1>')
          // 로그인 성공 req.session에 기록
          req.session.isLogin = true;
          req.session.userEmail = req.body.email;
          res.redirect('/');
        }else{
          res.send('<h1>로그인 실패</h1>')
        }
      }
    });
  }else{
    res.redirect('/');
  }
})

router.get('/logout', (req, res)=>{
  req.session.destroy(function(err){
    if(err)
        console.log(`req.session.destroy error : ${err}`);
    res.redirect('/');
  });
})

// 관리자 페이지
router.get('/admin', (req, res)=>{
  model.selectAllUsers((results)=>{
    res.render('admin',{
      results: results,
      isLogin: req.session.isLogin,
      userEmail: req.session.userEmail
    })
  })
})

// 새로운 사용자 추가 페이지
router.post('/admin/addNewUser', (req, res)=>{
  // console.log('req.body', req.body)
  if(req.session.isLogin){
    if(req.body.pwd === req.body.pwdr){
      model.insertNewUser(req.body, ()=>console.log(`${req.body.email} 사용자 추가 성공`))
    }
  }
  res.redirect('/users/admin');
})

// 사용자 제거 요청
router.get('/admin/deleteUser/:email', (req, res)=>{
  email = req.params.email;
  // console.log('email', email);
  model.deleteUser(email, ()=>console.log(`${req.body.email} 제거 성공`))
  res.redirect('/users/admin');
})

module.exports = router;