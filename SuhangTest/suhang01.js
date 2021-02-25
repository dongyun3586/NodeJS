var http = require('http');
var url = require('url');
var fs = require('fs')

var server = http.createServer(function(req, res){
    if(req.url === '/favicon.ico') return
    console.log('req.url : ', req.url);

    var parsedUrl = url.parse(req.url, true);     // url parsing
    console.log('parsedUrl.query : ', parsedUrl.query)

    if(parsedUrl.query.num1 && parsedUrl.query.num2 && parsedUrl.query.operator){
        let num1 = parseInt(parsedUrl.query.num1);
        let num2 = parseInt(parsedUrl.query.num2); 
        let operator = parsedUrl.query.operator;
        console.log(`num1 : ${num1}, num2 : ${num2}, operator : ${operator}`);

        let result
        switch(operator){
            case 'add': 
                result = num1 + num2
                break
            case 'subtract': 
                result = num1 - num2
                break
            case 'multiply': 
                result = num1 * num2
                break
            case 'divide': 
                result = num1 / num2
                break
        }
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.write(`<h1>계산 결과: ${result}</h1>`)
        res.end('<a href="http://localhost:8080">첫 화면으로 돌아가기</a>')
    }else{
        fs.createReadStream('./test.html').pipe(res)
    }
}).listen(8080, function(){
    console.log('8080 포트에서 대기중');
});
