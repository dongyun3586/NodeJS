var express = require('express');
var router = express.Router();
var model = require('../models/memberDAO');

// 로그인 처리
router.post('/login', (req, res)=>{
  if(req.body.email && req.body.password){
    console.log('req.body: ', req.body);

    //#region 1. Callback
    // model.selectMember(req.body.email, (results)=>{
    //   // res.send(results[0]);
    //   //console.log('results: ', results);
    //   //console.log(req.body.email, results[0].name, req.body.password, results[0].pwd)

    //   if(results[0]==undefined){
    //     res.send('<h1>로그인 실패</h1><a href="/"><h1>Home</h1></a>')
    //   }else{
    //     if(req.body.email === results[0].email && req.body.password === results[0].pwd){
    //       // res.send('<h1>로그인 성공</h1>')
    //       // 로그인 성공 req.session에 기록
    //       req.session.isLogin = true;
    //       req.session.user_email = req.body.email;
    //       req.session.user_name = results[0].name;
    //       res.redirect('/');
    //     }else{
    //       res.send('<h1>로그인 실패</h1><a href="/"><h1>Home</h1></a>')
    //     }
    //   }
      
    // });
    //#endregion

    //#region 2. Promise
    // model.selectMember(req.body.email)
    //   .then((results)=>{
    //     if(results[0]==undefined){
    //       res.send('<h1>로그인 실패</h1><a href="/"><h1>Home</h1></a>')
    //     }else{
    //       if(req.body.email === results[0].email && req.body.password === results[0].pwd){
    //         req.session.isLogin = true;
    //         req.session.user_email = req.body.email;
    //         req.session.user_name = results[0].name;
    //         res.redirect('/');
    //       }else{
    //         res.send('<h1>로그인 실패</h1><a href="/"><h1>Home</h1></a>')
    //       }
    //     }
    //   })
    //   .catch((err)=>{
    //     console.log(err);
    //   })
    //#endregion

    //#region 3. async await
    (async ()=>{
      let results = await model.selectMember(req.body.email);
      if(results[0]==undefined){
        res.send('<h1>로그인 실패</h1><a href="/"><h1>Home</h1></a>')
      }else{
        if(results[0]==undefined){
          res.send('<h1>로그인 실패</h1><a href="/"><h1>Home</h1></a>')
        }else{
          if(req.body.email === results[0].email && req.body.password === results[0].pwd){
            req.session.isLogin = true;
            req.session.user_email = req.body.email;
            req.session.user_name = results[0].name;
            res.redirect('/');
          }else{
            res.send('<h1>로그인 실패</h1><a href="/"><h1>Home</h1></a>')
          }
        }
      }
    })()
    //#endregion
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

router.get('/modify', (req, res)=>{
  //#region 1. Callback
  // model.selectMember(req.session.user_email, (results)=>{
  //   console.log(results[0])
  //   res.render('member', 
  //   { 
  //     title: 'Member 정보 수정페이지', 
  //     isLogin: req.session.isLogin, 
  //     user_email: req.session.user_email, 
  //     user_name: req.session.user_name,
  //     results: results[0]
  //   });
  // })
  //#endregion

  //#region 2. Promise
  // model.selectMember(req.session.user_email)
  //   .then(results => {
  //     console.log(results[0])
  //   res.render('member', { 
  //     title: 'Member 정보 수정페이지', 
  //     isLogin: req.session.isLogin, 
  //     user_email: req.session.user_email, 
  //     user_name: req.session.user_name,
  //     results: results[0] }
  //     );
  //   })
  //#endregion

  //#region async await
  (async ()=>{
    let results = await model.selectMember(req.session.user_email);
    res.render('member', { 
      title: 'Member 정보 수정페이지', 
      isLogin: req.session.isLogin, 
      user_email: req.session.user_email, 
      user_name: req.session.user_name,
      results: results[0] }
      );
  })()
  //#endregion
})

router.post('/modify', (req, res)=>{
  res.send('회원 정보 수정 기능 실행 <a href="/">Home</a>')
})

module.exports = router;
