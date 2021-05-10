const http = require('http')
const cookie = require('cookie')

const server = http.createServer(function(req, res){
    console.log('req.url', req.url)
    if(req.headers.cookie === undefined){
        res.writeHead(200, {'Set-Cookie': 'myCookie=HelloNode'});
    }else{
        let cookies = {}
        console.log('req.headers.cookie: ', req.headers.cookie)    // request 헤더에 담긴 쿠키 문자열
        cookies = cookie.parse(req.headers.cookie)
        console.log('cookies: ',cookies)    // cookie 모듈에 의해 객체화된 쿠키 문자열
    }
    res.end()
}).listen(8080, function(){
    console.log('8080 포트에서 대기중')
})