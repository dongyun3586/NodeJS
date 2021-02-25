var express = require('express');
var router = express.Router();
var model = require('../models/dramaDAO');

router.get('/', async (req, res)=>{
  let results = await model.selectDrama()
  res.render('dramaList', { title: 'My Favorite Drama List', list: results, isLogin: req.session.isLogin })
})

router.post('/', async (req, res)=>{
  if(req.body.title && req.body.actor){
    await model.insertDrama(req.body)
    res.redirect('/drama')
  }
})

router.post('/update/:id', async (req, res)=>{
  if(req.body.title && req.body.actor){
    await model.updateDrama(req.params.id, req.body)
  }
  res.redirect('/drama')
})

router.get('/delete/:id', async (req, res)=>{
  await model.deleteDrama(req.params.id)
  res.redirect('/drama')
})

module.exports = router;