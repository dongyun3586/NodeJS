var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dramaList.db');

router.get('/', function(req, res){
    // 데이터베이스에서 드라마 목록을 가져와서 dramaList.pug와 렌더링하여 서비스
    db.all(`SELECT * FROM dramaTable`,
        function(err, rows){
            if(err){
                console.log(err.message);
            }else{
                res.render('dramaList', {title: 'Dongyun', list: rows});
            }
        }
    );
});

router.post('/', function(req, res){
    if(req.body.title && req.body.actor){
        db.run(`INSERT INTO dramaTable (title, actor) VALUES ($title, $actor)`,
        {$title: req.body.title, $actor: req.body.actor},
        function(err){
            if(err){
                console.log(err.message);
            }else{
                console.log('data inserted');
            }
        });
    }
    res.redirect('/');
});

router.put('/', function(req, res){
    if(req.body.title && req.body.newTitle && req.body.newActor){
        db.run(`UPDATE dramaTable SET title = $newTitle, actor = $newActor WHERE title = $title`,
            {$title: req.body.title, $newTitle: req.body.newTitle, $newActor: req.body.newActor},
            function(err){
                if(err){
                    console.log(err.message);
                }else{
                    console.log('data updated');
                }
            }
        )
    }
    res.redirect('/');
});

router.delete('/', function(req, res){
    if(req.body.title){
        db.run(`DELETE FROM dramaTable WHERE title = $title`,
            {$title: req.body.title},
            function(err){
                if(err){
                    console.log(err.message);
                }else{
                    console.log('data deleted');
                }
            }
        )
    }
    res.redirect('/');
})

module.exports = router;