var express = require('express');
var router = express.Router();
var model = require('../models/usersDAO');

// 로그인 처리
router.post('/login', async (req, res) => {
  if(req.body.email && req.body.pwd){
    //console.log('req.body: ', req.body);
    const results = await model.selectUser(req.body.email);
    if(results.length===0){
      res.send('<h1>로그인 실패</h1>');
      return;
    }
    // console.log('results: ', results[0].email,results[0].pwd,results[0].name,results[0].role,results[0].level);
    // console.log(req.body.email, results[0].email, req.body.pwd, results[0].pwd)
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
  }
})
  
// 로그아웃 처리
router.get('/logout', (req, res)=>{
  req.session.destroy(function(err){
    if(err)
        console.log(`req.session.destroy error : ${err}`);
    res.redirect('/');
  });
})

router.post('/add_user',async(req,res)=>{
  console.log('im here');
  console.log(req.body.name,req.body.email,req.body.psw,req.body.role);
  try{
    await model.Add_user(req.body.name,req.body.email,req.body.psw,req.body.role,req.body.level);
    res.redirect('/users/user_manage')
  //  coneselog.log(dkdk);
  }catch(error){
    console.log(req.body.name,req.body.email,req.body.psw,req.body.role);
 //   conesole.log(tete);
    res.send('<p><h1>Error</h1></p><p><small>다음과 같은 문제일수 있습니다.</small></p><p><small>-잘못 입력된 level</small></p><p><small>-이름이 10자 이상이거나 이메일이 50자 이상, 혹은 비밀번호가 250자 초과(이하여야 함)</small></p><p><small>-이미 존재하는 email</small></p><p><small>해결되지 않을시 관리자에게 문의하십시오.</small></p>');
  }
})
// 사용자 목록 화면 요청
router.get('/user_manage',async(req, res)=>{
 // console.log('user list');
  let results = await model.selectAllUsers();
  res.render('show_user_list',{results:results,isLogin:req.session.isLogin,userEmail:req.session.userEmail})
})

router.get('/user_delete/:email',async(req,res)=>{
  //console.log("test");
  //res.render('test',{email:req.params.email});
  try{
    await model.delete(req.params.email);
   // console.log("okay");
  } catch(error){
    console.error(error.message);
  }
 res.redirect('/users/user_manage');
})

module.exports = router;