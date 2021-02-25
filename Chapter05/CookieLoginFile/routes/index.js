var express = require('express');
var router = express.Router();
var fs = require('fs');

function isItCertified(req, res){
    var certification = false;
    if(req.cookies.username === 'ldy' && req.cookies.password === '1111'){
        certification = true;
    }
    return certification;
}

function authStatusUI(req, res){
    var isLogin = 0;
    console.log(`isItCertified=${isItCertified(req, res)}`);
    if(isItCertified(req, res)){
        isLogin = 1;
    }
    return isLogin;
}

router.get('/', function(req, res){
    if(req.query.id === undefined){
        fs.readdir('./data', function(err, fileList){
            res.render('index', {
                title: 'Login Test', 
                list: fileList, 
                description: 'Hello, Node.js',
                isroot: 1, 
                isLogin: authStatusUI(req, res)
            });
        });
    }else{
        var fileName = req.query.id;
        fs.readdir('./data', function(err, fileList){
            fs.readFile(`data/${fileName}`, 'utf8', function(err, data){
                res.render('index', {
                    title: fileName, 
                    list: fileList, 
                    description: data,
                    isroot: 0,
                    isLogin: authStatusUI(req, res)
                });
            });
        });
    }
    
});

router.get('/create', function(req, res){
    if(isItCertified(req, res) === false){
        res.redirect('/login.html');
        return false;
    }
    fs.readdir('./data', function(err, fileList){
        res.render('create', {
            action: 'create',
            title: 'Login Test', 
            list: fileList, 
        });
    });
});

router.post('/create', function(req, res){
    fs.writeFile(`data/${req.body.title}`, req.body.description, 'utf8', function(err){
        res.redirect(`/?id=${req.body.title}`);
    });
});

router.get('/update', function(req, res){
    if(isItCertified(req, res) === false){
        res.redirect('/login.html');
        return false;
    }
    fs.readdir('./data', function(err, fileList){
        res.render('create', {
            action: `update/${req.query.id}`,
            title: 'Update Test', 
            list: fileList, 
        });
    });
});

router.post('/update/:fileId', function(req, res){
    fs.rename(`data/${req.params.fileId}`, `data/${req.body.title}`, function(err){
        fs.writeFile(`data/${req.body.title}`, req.body.description, 'utf8', function(err){
            res.redirect(`/?id=${req.body.title}`);
        });
    })
});

router.post('/delete', function(req, res){
    if(isItCertified(req, res) === false){
        res.redirect('/login.html');
        return false;
    }
    fs.unlink(`data/${req.body.deleteFileName}`, function(err){
        if(err){
            console.log(err.message);
        }else{
            res.redirect('/');
        } 
    });
});

router.post('/login', function(req, res){
    console.log(req.body);
    if(req.body.uname === 'ldy' && req.body.psw === '1111'){
        res.cookie('username', req.body.uname);
        res.cookie('password', req.body.psw);
        res.redirect('/');
    }else{
        res.send('Who?');
    }
});

router.get('/logout', function(req, res){
    res.clearCookie('username');
    res.clearCookie('password');
    res.redirect('/');
});

module.exports = router;