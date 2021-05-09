var express = require('express');
var router = express.Router();
var model = require('../models/worldDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MySQL Test' });
});

router.post('/world', (req, res)=>{
  (async ()=>{
    let results = await model.selectCountry(req.body);
    console.log(results);
    res.render('index', { title: 'MySQL Test', results: results })
  })()
})

module.exports = router;
