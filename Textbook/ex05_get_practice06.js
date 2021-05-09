var http = require('http');

// get 방식으로 넘어온 두 값(num1, num2)을 활용하여 두 값 사이의 합계 구하기
var server = http.createServer(function(req, res){
  // /favicon.ico 요청 처리
  if(req.url === '/favicon.ico'){
    return    
  }

  // <1> url을 parsing하여 객체로 저장
  console.log('req.url', req.url)  
  const parsedURL = new URL(req.url, 'http://localhost:8080')

  // <2> parsing된 url에서 querystring 객체 확인
  const qs = parsedURL.searchParams
  console.log('qs : ', qs);  // { num1: '1', num2: '100' }

  // <3> qs의 num1, num2값을 정수로 변환하여 저장
  let num1 = parseInt(qs.get('num1'));
  let num2 = parseInt(qs.get('num2')); 
  console.log(`num1 : ${num1}, num2 : ${num2}`);

  // <4> num1, num2에 숫자가 아닌 값이 들어있으면 400 Bad Request 에러 코드 전송
  if( Number.isNaN(num1) || Number.isNaN(num2) ){
    res.statusCode = 400;  // 400 Bad Request
    res.end('<h1>Bad Request</h1>');
  }else{
    var sum = 0;
    for(var i=num1; i<=num2; i++){
      sum += i;
    }
    res.end(`<h1>${num1} ~ ${num2}까지의 합계는 ${sum} 입니다.</h1>`);   
  }
}).listen(8080, function(){
  console.log('8080 포트에서 대기중');
});
