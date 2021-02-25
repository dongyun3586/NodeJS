var express = require('express');
var router = express.Router();
var fs = require('fs');
var model = require('../models/mongodbDAO');
var isMember = require('../lib/certifyMember');

// 입력된 글의 목록을 표시하거나, 특정 글이 선택되면 그 내용을 보여줌.
router.get('/', function(req, res){
    // querystring이 있을 때와 없을 때를 나눠서 처리, ?id= 글 제먹을 눌렀을 때 url에 붙음
    if(req.query.id === undefined){  // querystring id값이 없는 경우
        model.findDocs({query: {}, callback: function(docs){
            // title만 배열 titles에 저장
            var titles = [];
            docs.forEach(element => {
                titles.push(element.title);
            });
            res.render('index', {
                list: titles, 
                title: 'None selected.', 
                description: 'None selected.',
                isroot: 1, // a(href="/create") create 만 표시
                isLogin: isMember.authStatusUI(req, res)  // 로그인 상태 표시
            });
        }});
    }else{
        // 특정 목록 title을 클릭하여 req.query.id값이 있는 경우
        var fileName = req.query.id;
        model.findDocs({query: {}, callback: function(docs){
            var titles = [];
            var contents;
            docs.forEach(element => {
                titles.push(element.title);
                if(element.title === req.query.id){  // 선택된 title의 본문을 contents 변수에 저장
                    contents = element.description;
                }
            });

            res.render('index', {
                list: titles, 
                title: fileName,
                description: contents, 
                isroot: 0,
                isLogin: isMember.authStatusUI(req, res)
            });
        }});
    }
});

// 새로운 글 작성 페이지 표시.
router.get('/create', function(req, res){
    // 로그인 상태가 아니면 login.html로 리다이렉트.
    if(isMember.isItCertified(req, res) === false){
        res.redirect('/login.html');
        return false;
    }

    // DB에서 글 목록을 가져와 입력 Form과 함께 표시
    model.findDocs({query: {}, callback: function(docs){
        var titles = [];
        docs.forEach(element => {
            titles.push(element.title);
        });
        res.render('create', {
            title: 'Login Test',
            list: titles, 
            action: 'create', 
        });
    }});
});

// 새로운 글 작성 처리.
router.post('/create', function(req, res){
    // title과 description 내용이 있으면 DB에 저장.
    if(req.body.title && req.body.description){
        model.insertOne(req.body);
    }
    res.redirect('/');
});

// 글 수정 페이지 표시.
router.get('/update', function(req, res){
    // 로그인 상태가 아니면 login.html로 리다이렉트.
    if(isMember.isItCertified(req, res) === false){
        res.redirect('/login.html');
        return false;
    }

    // DB에서 글 목록을 가져와 create.pug를 전송
    model.findDocs({query: {}, callback: function(docs){
        var titles = [];
        docs.forEach(element => {
            titles.push(element.title);
        });
        res.render('create', {
            title: 'Update',
            list: titles, 
            action: `update/${req.query.id}`  // 선택된 글의 제목을 파라미터로 넘기는 경로 호출
        });
    }});
});

// Update 요청 처리
router.post('/update/:fileId', function(req, res){
    // 특정 제목(fileId)의 글을 수정
    if(req.body.title && req.body.description){
        console.log(`title: ${req.params.fileId}`);

        // DB에 title이 fileID인 도큐먼트를 찾아서, 새로운 title, description으로 수정.
        model.updateOne({
            filterQuery: {title: req.params.fileId}, 
            updateQuery: {title: req.body.title, description: req.body.description},
        });
    }
    res.redirect(`/?id=${req.body.title}`);
});

// 특정 글 delete 요청 처리
router.post('/delete', function(req, res){
    // 로그인 상태 체크
    if(isMember.isItCertified(req, res) === false){
        res.redirect('/login.html');
        return false;
    }

    // 삭제할 글의 제목을 넘겨 해당 도큐먼트 삭제.
    model.deleteOne({title: req.body.deleteTitle});
    res.redirect('/');
});

// 로그인 처리
router.post('/login', function(req, res){
    console.log(req.body);
    // uname과 psw가 일치하면 쿠키 전송
    if(req.body.uname === 'ldy' && req.body.psw === '1111'){
        res.cookie('username', req.body.uname);
        res.cookie('password', req.body.psw);
        res.redirect('/');
    }else{
        res.send('Who?');
    }
});

// 로그아웃 처리 : 쿠키 삭제
router.get('/logout', function(req, res){
    res.clearCookie('username');
    res.clearCookie('password');
    res.redirect('/');
});

module.exports = router;