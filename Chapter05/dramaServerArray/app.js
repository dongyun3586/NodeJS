var express = require('express')
var logger = require('morgan');
var app = express();

app.use(logger('dev'));  // 로깅 처리
app.use(express.static('public'));  // 정적 파일 처리
app.use(express.urlencoded({ extended: true }));  // body 데이터 파싱

app.set('view engine', 'pug'); // 템플릿 엔진을 pug로 지정
app.set('views', './views');  // pug 파일이 저장된 디렉토리 지정

// 드라마 목록
var dramaList = [
    {title: '나의 아저씨', actor: '아이유, 이선균'},
    {title: '미스터 션샤인', actor: '김태리, 이병헌'}
]

app.get('/', function(req, res){
    res.render('dramaList', {title: 'First Pug Test', list: dramaList});
});

app.post('/', function(req, res){
    if(req.body.title && req.body.actor){
        dramaList.push({title: req.body.title, actor: req.body.actor});
        res.redirect('/');
    }else{
        res.render('dramaList', {title: 'First Pug Test', list: dramaList});
    }
})

app.listen(8080, function(){
    console.log('8080 포트에서 대기중');
})

