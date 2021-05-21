var express = require('express');
var router = express.Router();

// 드라마 목록
var dramaList = [
  {title: '나의 아저씨', actor: '아이유, 이선균'},
  {title: '미스터 션샤인', actor: '김태리, 이병헌'}
]

router.get('/', function(req, res, next) {
  res.render('index', { title: 'MyDrama', list: dramaList });
});

router.post('/', function(req, res){
  if(req.body.title && req.body.actor){
      dramaList.push({title: req.body.title, actor: req.body.actor});
      res.redirect('/');
  }else{
      res.render('dramaList', {title: 'First EJS Test', list: dramaList});
  }
})

module.exports = router;