const http = require('http')
const fs = require('fs')
const cookie = require('cookie')

const server = http.createServer(function(req, res){
    // favicon 요청 무시
    if(req.url === '/favicon.ico'){
        return
    }

    // cookie가 존재하면 파싱
    let cookies = {}
    if(req.headers.cookie !== undefined){
        cookies = cookie.parse(req.headers.cookie)
        console.log('cookies: ',cookies); 
    }
    
    // 쿠키 존재에 여부에 따른 분기 처리
    if(req.url.startsWith('/setCookie')){
        global.visit_count = 0
        const parsedUrl = new URL(req.url, 'http://localhost:8080')
        const query = parsedUrl.searchParams
        res.writeHead(302, {'Set-Cookie':`name=${query.get('name')}`, 'Location': '/'})
        res.end()
    }else if(req.url === '/clearCookies'){
        console.log('쿠키 삭제')
        res.writeHead(302, {'Set-Cookie':'name=; Max-Age=0', 'Location': '/'})
        res.end();
    }else if(cookies.name){    // cookies.name이 존재하면 true
        global.visit_count += 1
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'})
        res.write(`<h1>welcome ${cookies.name}님, ${global.visit_count}번째 방문입니다.</h1>`)
        res.write('<h3><a href=/clearCookies>쿠키 삭제하기</a></h3>')
        res.end('<img src="https://nodejs.org/static/images/logo.svg">')
    }else{
        fs.readFile('./ex05_setCookie.html', function(err, data){
            res.end(data)
        })
    }
}).listen(8080, function(){
    console.log('8080 포트에서 대기중')
})