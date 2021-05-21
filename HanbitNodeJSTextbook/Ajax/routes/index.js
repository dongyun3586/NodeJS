var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/process', (req, res)=>{
  console.log('req.body', req.body)
  res.render('index', { title: 'Express', favoriteColor: req.body.color });
})

router.get('/fetch', (req, res)=>{
  val = {'str': '서버에서 보내준 데이터'}
  res.send(val);
})

router.post('/fetch', (req, res)=>{
  console.log(req.body)
  val = {'data1': req.body.data1, 'data2': req.body.data2}
  res.send(val)
})

module.exports = router;
