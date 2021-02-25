var express = require('express');
var router = express.Router();
var model = require('../models/dramaDAO');

router.get('/', (req, res)=>{
  model.selectDrama()
  .then((results)=>res.render(
    'dramaList', 
    { title: 'My Favorite Drama List', list: results, isLogin: req.session.isLogin }))
  .catch(console.log)
})

router.post('/', (req, res)=>{
  if(req.body.title && req.body.actor){
    model.insertDrama(req.body)
      .finally(res.redirect('/drama'))
  }
})

router.post('/update/:id', function(req, res){
  if(req.body.title && req.body.actor){
    model.updateDrama(req.params.id, req.body)
      .finally(res.redirect('/drama'))
  }else{
    res.redirect('/drama');
  }
})

router.get('/delete/:id', function(req, res){
  model.deleteDrama(req.params.id).finally(res.redirect('/drama'))
})

module.exports = router;