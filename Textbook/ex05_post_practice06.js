var http = require('http');

// post 방식으로 넘어온 두 값(num1, num2)을 활용하여 두 값 사이의 합계 구하기
var server = http.createServer(function(req, res){

  if(req.method.toLowerCase() === 'post'){  // 메소드가 post 방식인가?
    var body = '';

    req.on('data', function(chunk){
      body += chunk;
    });

    req.on('end', function(){
      console.log('body', body)
      var data = querystring.parse(body);
      let num1 = parseInt(data.num1);
      let num2 = parseInt(data.num2); 
      console.log(`num1 : ${num1}, num2 : ${num2}`);

      if( Number.isNaN(num1) || Number.isNaN(num2) ){
        res.statusCode = 400;  // 400 Bad Request
        res.end('<h1>Bad Request</h1>');
      }else{
        var sum = 0;
        for(var i=num1; i<=num2; i++){
          sum += i;
        }
        res.end(`<h1>${sum}</h1>`);
      }
      res.writeHead(302, {'Location': '/'});
      res.end();
    });
  } 
}).listen(8080, function(){
  console.log('8080 포트에서 대기중');
});
//#endregion
