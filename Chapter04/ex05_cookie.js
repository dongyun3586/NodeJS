var http = require('http')
var fs = require('fs')
var url = require('url')
var cookie = require('cookie')

var server = http.createServer(function(req, res){
    if(req.url === '/favicon.ico'){
        return;
    }
    console.log('req.url: ', req.url)

    // 1. cookie 파싱
    var cookies = {}
    if(req.headers.cookie !== undefined){
        cookies = cookie.parse(req.headers.cookie);
        console.log('cookies: ',cookies);   
    }
    
    // 2. 쿠키 존재에 여부에 따른 분기 처리
    if(req.url.startsWith('/setCookie')){
        global.visit_count = 0
        var parsedUrl = url.parse(req.url, true);
        var query = parsedUrl.query;
        console.log('parsedUrl.query: ', parsedUrl.query);
        res.writeHead(302, {'Set-Cookie':`name=${query.name}`, 'Location': '/'});
        res.end();
    }else if(req.url === '/clearCookies'){
        console.log('쿠키 삭제')
        res.writeHead(302, {'Set-Cookie':'name=; Max-Age=0', 'Location': '/'})
        res.end();
    }else if(cookies.name){    // cookies.name이 존재하면 true
        global.visit_count += 1
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        res.write(`<h1>welcome ${cookies.name}, ${global.visit_count}번째 방문입니다.</h1>`);
        res.write('<h3><a href=/clearCookies>쿠키 삭제하기</a></h3>')
        res.end('<img src="http://gg.gg/mulxu">');
    }else{
        fs.readFile('./ex05_setCookie.html', function(err, data){
            res.end(data);
        });
    }
}).listen(8080, function(){
    console.log('8080 포트에서 대기중');
});