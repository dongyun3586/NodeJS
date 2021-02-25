var http = require('http');

//#region 1. cookie 만들기
// var server = http.createServer((req, res)=>{
//     //#region 1-1. 세션(session) 쿠키 => 세션이 끝날 때 삭제
//     // res.writeHead(200, {'Set-Cookie': 'myCookie=dongyun'});
//     res.writeHead(200, {'Set-Cookie':['yummy_cookie=choco','tasty_cookie=strawberry']});
//     //#endregion

//     //#region 1-2. 영속적인(permanent) 쿠키 => Max-Age 속성에 명시된 기간 이후에 삭제
//     // res.writeHead(200, {'Set-Cookie':['yummy_cookie=choco', 'tasty_cookie=strawberry', `Permanent=cookies; Max-Age=${60*60*24*30}`]
//     // });
//     //#endregion

//     res.end('<h1>Cookie Test</h1>');
// }).listen(8080, ()=>{
//     console.log('8080 포트에서 대기중');
// });
//#endregion

//#region 2. cookie 읽기
var fs = require('fs')
var url = require('url')
var cookie = require('cookie')

var server = http.createServer(function(req, res){
    console.log('req.headers.cookie: ', req.headers.cookie);    // request 헤더에 담긴 쿠키 문자열

    // cookie 파싱
    var cookies = {}
    if(req.headers.cookie !== undefined){
        cookies = cookie.parse(req.headers.cookie);
        console.log('cookies: ',cookies);    // cookie 모듈에 의해 객체화된 쿠키 문자열
    }
}).listen(8080, function(){
    console.log('8080 포트에서 대기중');
});
//#endregion


