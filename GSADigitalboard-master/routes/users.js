var express = require('express');
var router = express.Router();
var model = require('../models/usersDAO');

// 로그인 처리
console.log('now in users1');
router.post('/login', (req, res)=>{
  if(req.body.email && req.body.pwd){
    console.log('req.body: ', req.body);
    model.selectUser(req.body.email, (results)=>{
      //res.send(results[0]);
      if(results.length==0){
    //    res.redirect('/');
        res.send('<h1>로그인 실패</h1>');
        return;
      }
      console.log('results: ', results[0].email,results[0].pwd,results[0].name,results[0].role,results[0].level);
      console.log(req.body.email, results[0].email, req.body.pwd, results[0].pwd)
      if(req.body.email === results[0].email && req.body.pwd === results[0].pwd){
        //res.send('<h1>로그인 성공</h1>')
        // 로그인 성공 req.session에 기록
        req.session.isLogin = true;
        req.session.userEmail = req.body.email;
        req.session.name = results[0].name;
        req.session.level = results[0].level;
        // console.log('test')
        res.redirect('/');
      }else{
     //   res.redirect('/');
        res.send('<h1>로그인 실패</h1>')
      }
    });
  }else{
    res.send('<h1>로그인 실패</h1>')
  //  res.redirect('/');
  }
})

router.get('/logout', (req, res)=>{
  req.session.destroy(function(err){
    if(err)
        console.log(`req.session.destroy error : ${err}`);
    res.redirect('/');
  });
})

module.exports = router;