var http = require('http');
var fs = require('fs');
var path = require('path')

//#region 1. 정적 파일 요청 처리: fs.readFile() 사용
// var server = http.createServer(function(req, res){
//     console.log('req.url : ', req.url);
//     if(req.url === '/favicon.ico'){
//         var favicon_path = path.join(__dirname, 'public', 'favicon.ico');
//         res.setHeader('Content-Type', 'image/x-icon');
//         fs.readFile(favicon_path, (err, data)=>res.end(data))
//         //fs.createReadStream(favicon_path).pipe(res);
//     }
//     if(req.url === '/'){
//       res.setHeader('Content-Type', 'text/html');
//       fs.readFile('./public/index.html', function(err, data){
//         if(err) throw err;
//         res.end(data);
//       });
//     }else if(req.url === '/iu.png'){
//       res.setHeader('Content-Type', 'image/png');
//       fs.readFile('./public/iu.png', function(err, data){
//         if(err) throw err;
//         res.end(data);
//       });
//     }else if(req.url === '/music.mp3'){
//       res.setHeader('Content-Type', 'audio/mpeg');
//       fs.readFile('./public/music.mp3', function(err, data){
//         if(err) throw err;
//         res.end(data);
//       });
//     }else if(req.url === '/streaming.mp4'){
//       res.setHeader('Content-Type', 'video/mp4');
//       fs.readFile('./public/streaming.mp4', function(err, data){
//         if(err) throw err;
//         res.end(data);
//       });
//     }
//   }).listen(8080, function(){
//     console.log('8080 포트에서 대기중');
//   });
  //#endregion

//#region 2. 정적 파일 요청 처리 : 스트림 활용
var server = http.createServer(function(req, res){
    console.log('req.url : ', req.url);
    if(req.url === '/favicon.ico'){
        var favicon_path = path.join(__dirname, 'public', 'favicon.ico');
        res.setHeader('Content-Type', 'image/x-icon');
        fs.readFile(favicon_path, (err, data)=>res.end(data))
        //fs.createReadStream(favicon_path).pipe(res);
    }else if(req.url === '/'){
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
    }
  }).listen(8080, function(){
    console.log('8080 포트에서 대기중');
  });
  //#endregion

















