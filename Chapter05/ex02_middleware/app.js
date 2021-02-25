var express = require('express');
var app = express();               
const port = 3000

//#region 1. 정적 파일 처리 미들웨어 (express.static('public')) 
// 정적 파일 처리 미들웨어 => 디렉토리 public 이름은 URL의 일부가 아니다.
var logger = require('morgan');

app.use(logger('dev'));
app.use(express.static('public'));  

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/hello.html');
});

app.get('/', (req, res)=>{
    res.send('<h1>Hello express</h1>')
});

app.get('/hi', (req, res) => res.send('<h1>Hi Express</h1>'))
app.get('/iu', (req, res) => res.redirect('/iu.png'));
//#endregion

//#region 2. 미들웨어 만들기
// // Express는 웹 서비스를 위한 기본적인 기능과 구조를 제공한다.
// // 미들웨어 함수는 다양한 기능을 제공하여 사용자가 선택하여 실행할 수 있다.

// // var birds = require('./routes/birds')

// function mw1(req, res, next){
//     console.log('middle ware 1');
//     req.myName = 'dongyun';
//     next();
// }
// function mw2(req, res, next){
//     console.log('middle ware 2');                                                                                                                                                                           
//     next();
// }

// app.use(mw1);
// app.use(mw2);
// // app.use(mw2, mw1);

// // app.use('/bird', birds);

// app.get('/', function(req, res){
//     console.log(`req.url: ${req.url}`);
//     res.send(`<h1>${req.myName}</h1>`);
// });

// app.get('/hi', (req, res) => {
//     console.log(`req.url: ${req.url}`);
//     res.send('<h1>Hello</h1>');
// });
//#endregion

//#region 3. get, post 요청 처리(num1 ~ num2까지의 합계 구하기)
// var logger = require('morgan');

// app.use(logger('dev'));
// app.use(express.static('public'));

// // req.query 값 확인
// // app.get('/', (req, res) => console.log(req.query))

// // get 요청 처리(num1 ~ num2까지의 합계)
// app.get('/', function(req, res){
//     if(req.query.num1 && req.query.num2){
//         var num1 = parseInt(req.query.num1);
//         var num2 = parseInt(req.query.num2);
//         console.log(`num1=${num1}, num2=${num2}`);
//         res.send(`
//             <h1>GET 요청 처리 결과: ${calculateSum(num1, num2)}</h1>
//             <h1><a href="/">Home</a></h1>
//         `);
//     }else{
//         console.log('/sumRequest.html 리다이렉트 요청')
//         res.redirect('/sumRequest.html')
//     }
// });

// function calculateSum(num1, num2){
//     var sum = 0;
//     for(var i=num1; i<=num2; i++){
//         sum += i;
//     }
//     return sum;
// }

// // post 요청 처리(num1 ~ num2까지의 합계)
// app.use(express.urlencoded({ extended: true }));

// app.post('/', function(req, res){
//     console.log('req.body: ', req.body)
//     if(req.body.num1 && req.body.num2){
//         var num1 = parseInt(req.body.num1);
//         var num2 = parseInt(req.body.num2);
//         console.log(`num1=${num1}, num2=${num2}`);
//         res.send(`
//             <h1>POST 요청 처리 결과: ${calculateSum(num1, num2)}</h1>
//             <h1><a href="/">Home</a></h1>
//         `);
//     }else{
//         console.log('/sumRequest.html 리다이렉트 요청')
//         res.redirect('/sumRequest.html')
//     }
// });
//#endregion

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


