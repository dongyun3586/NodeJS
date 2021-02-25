var http = require('http')
var fs = require('fs')
var path = require('path')

//#region 1. 정적 파일 요청 처리: fs.readFile() 사용
var server = http.createServer(function(req, res){
  console.log('req.url : ', req.url);
  if(req.url === '/'){
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('./public/index.html', function(err, data){
      if(err) throw err;
      res.end(data);
    });
  }else if(req.url === '/iu.png'){
    res.setHeader('Content-Type', 'image/png');
    fs.readFile('./public/iu.png', function(err, data){
      if(err) throw err;
      res.end(data);
    });
  }else if(req.url === '/music.mp3'){
    res.setHeader('Content-Type', 'audio/mpeg');
    fs.readFile('./public/music.mp3', function(err, data){
      if(err) throw err;
      res.end(data);
    });
  }else if(req.url === '/streaming.mp4'){
    res.setHeader('Content-Type', 'video/mp4');
    fs.readFile('./public/streaming.mp4', function(err, data){
      if(err) throw err;
      res.end(data);
    });
  }else if(req.url === 'favicon.ico'){}
}).listen(8080, function(){
  console.log('8080 포트에서 대기중');
});
//#endregion

//#region 2. 정적 파일 요청 처리 : 스트림 활용
var server = http.createServer(function(req, res){
  console.log('req.url : ', req.url);
  if(req.url === '/'){
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('./public/index.html').pipe(res);
  }else if(req.url === '/iu.png'){
    res.setHeader('Content-Type', 'image/png');
    fs.createReadStream('./public/iu.png').pipe(res);
  }else if(req.url === '/music.mp3'){
    res.setHeader('Content-Type', 'audio/mpeg');
    fs.createReadStream('./public/music.mp3').pipe(res);
  }else if(req.url === '/streaming.mp4'){
    res.setHeader('Content-Type', 'video/mp4');
    fs.createReadStream('./public/streaming.mp4').pipe(res);
  }else if(req.url === 'favicon.ico'){}
}).listen(8080, function(){
  console.log('8080 포트에서 대기중');
});
//#endregion

//#region 2. 정적 파일 요청 처리 : 스트림 활용
var server = http.createServer(function(req, res){
  console.log('req.url : ', req.url);
  if(req.url === '/'){
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('./public/index.html').pipe(res);
  }else if(req.url === '/iu.png'){
    res.setHeader('Content-Type', 'image/png');
    fs.createReadStream('./public/iu.png').pipe(res);
  }else if(req.url === '/music.mp3'){
    res.setHeader('Content-Type', 'audio/mpeg');
    fs.createReadStream('./public/music.mp3').pipe(res);
  }else if(req.url === '/streaming.mp4'){
    res.setHeader('Content-Type', 'video/mp4');
    fs.createReadStream('./public/streaming.mp4').pipe(res);
  }else if(req.url === '/favicon.ico'){
    var favicon_path = path.join(__dirname, 'public', 'favicon.png');
    res.setHeader('Content-Type', 'image/x-icon');
    fs.createReadStream(favicon_path).pipe(res);
  }
}).listen(8080, function(){
  console.log('8080 포트에서 대기중');
});
//#endregion

// 모든 에러 처리
process.on('uncaughtException', (err) => {
  console.log('request error');
});

//#region 3. 정적 파일 요청 처리 : path, myMIME 활용
var myMIME = require('./myMIME');  // 사용자 정의 MIME 변환 모듈

var server = http.createServer(function(req, res){
  console.log('req.url : ', req.url);

  if(req.url === '/favicon.ico'){
    var favicon_path = path.join(__dirname, 'public', 'favicon.png');
    res.setHeader('Content-Type', 'image/x-icon');
    fs.createReadStream(favicon_path).pipe(res);
  }else if(req.url === '/'){
    req.url = '/index.html';
  }

  // 파일의 확장자를 알아낸 후, 알맞은 MIME Type으로 서비스한다.
  var filePath = path.join(__dirname, '..', '/public', req.url);  // 파일의 경로 string 생성
  var extension = path.extname(filePath).substring(1);
  console.log('filePath : ', filePath);
  console.log(extension);
  console.log(myMIME[extension]);
  var mimeType = myMIME[extension];  // 전송하는 파일에 맞는 MIME Type 저장

  //#region 3-1. fs 방식 서비스
  // fs.readFile(filePath, function(err, data){
  //   if(err){
  //     res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
  //     res.end(`<h1>file open 에러 발생</h1>
  //             <p>${err.message}</p>`);
  //   }
  //   res.writeHead(200, {'Content-Type': mimeType});
  //   res.end(data);
  // });
  //#endregion

  //#region 3-2. stream 방식 서비스
  fs.open(filePath, 'r', function(err){
    if(err){
      res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
      res.end(`<h1>file open 에러 발생</h1>
              <p>${err.message}</p>`);
    }else{
      res.writeHead(200, {'Content-Type': mimeType});
      fs.createReadStream(filePath).pipe(res);
    }
  });
  //#endregion
}).listen(8080, ()=>{
  console.log('8080 포트에서 대기중');
});
//#endregion

//#region 4. 정적 파일 요청 처리 : 서드파티 mime 모듈 활용
var mime = require('mime');

var server = http.createServer(function(req, res){
  console.log('req.url : ', req.url);

  if(req.url === '/favicon.ico'){
    var favicon_path = path.join(__dirname, 'public', 'favicon.png');
    res.setHeader('Content-Type', 'image/x-icon');
    fs.createReadStream(favicon_path).pipe(res);
  }else if(req.url === '/'){
    req.url = '/index.html';
  }

  // 파일의 확장자를 알아낸 후, 알맞은 MIME Type으로 서비스한다.
  var filePath = path.join(__dirname, '..', '/public', req.url);  // 파일의 경로 string 생성
  var mimeType = mime.getType(filePath);
  console.log(mimeType);

  // stream 방식 서비스
  fs.open(filePath, 'r', function(err){
    if(err){
      res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
      res.end(`<h1>file open 에러 발생</h1>
                <p>${err.message}</p>`);
    }else{
      res.writeHead(200, {'Content-Type': mimeType});
      fs.createReadStream(filePath).pipe(res);
    }
  });
}).listen(8080, ()=>{
  console.log('8080 포트에서 대기중');
});
//#endregion
