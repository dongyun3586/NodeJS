var express = require('express');
var router = express.Router();
var model = require('../models/dramaDAO');

router.get('/', function(req, res) {
  model.selectDrama((results)=>{
    //res.send(results)
    res.render('dramaList', { title: 'My Favorite Drama List', list: results });
  })
});

router.post('/', function(req, res){
  if(req.body.title && req.body.actor){
    model.insertDrama(req.body, ()=>{
      res.redirect('/');
    })
  }else{
    res.redirect('/');
  }
})

router.post('/update/:id', function(req, res){
  //res.send(`/update req.params.id: ${req.params.id}`);
  if(req.body.title && req.body.actor){
    model.updateDrama(req.params.id, req.body, ()=>{
      res.redirect('/');
    })
  }else{
    res.redirect('/');
  }
})

router.get('/delete/:id', function(req, res){
  //res.send(`/delete req.params.id: ${req.params.id}`);
  model.deleteDrama(req.params.id, ()=>res.redirect('/'))
})

module.exports = router;
