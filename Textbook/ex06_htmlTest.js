const http = require('http')
const fs = require('fs')

var server = http.createServer(function(req, res){
    console.log('req.url', req.url)
    if(req.url === '/'){
        fs.readFile('./public/index.html', (err,data)=>{
            res.end(data);
        })
    }else if(req.url === '/second'){
        fs.readFile('./public/second.html', (err,data)=>{
            res.end(data);
        })
    }else{
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end('요청한 페이지를 찾을 수 없습니다.')
    }
  }).listen(8080, function(){
    console.log('8080 포트에서 대기중');
  });