var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('req.session: ', req.session);
  console.log('req.session.cookie: ', req.session.cookie)
  console.log(`req.session['cookie']: `, req.session['cookie'])
  next();
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})
 
router.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

module.exports = router;
