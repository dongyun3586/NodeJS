var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('dramaList', {title: 'First Ejs Test', list: dramaList});
});

router.post('/', function(req, res){
  if(req.body.title && req.body.actor){
      dramaList.push({title: req.body.title, actor: req.body.actor});
      res.redirect('/');
  }else{
      res.render('dramaList', {title: 'First Ejs Test', list: dramaList});
  }
})

module.exports = router;
