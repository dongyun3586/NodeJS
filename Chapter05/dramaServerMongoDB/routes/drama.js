var express = require('express');
var router = express.Router();

var model = require('../models/dramaDAO');

router.get('/', function(req, res){
    model.dramaList({query: {}, callback: function(docs){
        console.log(docs);
        res.render('dramaList', {list: docs});
    }});
});

router.post('/', function(req, res){
    if(req.body.title && req.body.actor){
        model.insertDrama(req.body);
    }
    res.redirect('/');
});

module.exports = router;