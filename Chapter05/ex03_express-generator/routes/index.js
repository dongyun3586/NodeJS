var express = require('express');
var router = express.Router();

router.use((req, res)=>{
  console.log('req.url: ', req.url);

  if(req.url.startsWith('/setCookie')){
    global.visit_count = 0
    console.log('req.query: ', req.query);
    res.writeHead(302, {'Set-Cookie':`name=${req.query.name}`, 'Location': '/'});
    res.end();
  }else if(req.url === '/clearCookies'){
      console.log('쿠키 삭제')
      res.writeHead(302, {'Set-Cookie':'name=; Max-Age=0', 'Location': '/'})
      res.end();
  }else if(req.cookies.name){    // cookies.name이 존재하면 true
      global.visit_count += 1
      res.send(`
        <h1>welcome ${req.cookies.name}, ${global.visit_count}번째 방문입니다.</h1>
        <h3><a href=/clearCookies>쿠키 삭제하기</a></h3>
        <img src="http://gg.gg/mulxu">
      `);
  }else{
    res.redirect('/setCookie.html')
  }
})
  // if(req.url.startsWith('/setCookie')){
  //   global.visit_count = 0
  //   var parsedUrl = url.parse(req.url, true);
  //   var query = parsedUrl.query;
  //   console.log('parsedUrl.query: ', parsedUrl.query);
  //   res.writeHead(302, {'Set-Cookie':`name=${query.name}`, 'Location': '/'});
  //   res.end();
  // }else if(req.url === '/clearCookies'){
  //     console.log('쿠키 삭제')
  //     res.writeHead(302, {'Set-Cookie':'name=; Max-Age=0', 'Location': '/'})
  //     res.end();
  // }else if(cookies.name){    // cookies.name이 존재하면 true
  //     global.visit_count += 1
  //     res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
  //     res.write(`<h1>welcome ${cookies.name}, ${global.visit_count}번째 방문입니다.</h1>`);
  //     res.write('<h3><a href=/clearCookies>쿠키 삭제하기</a></h3>')
  //     res.end('<img src="http://gg.gg/mulxu">');
  // }else{
  //     fs.readFile('./ex05_setCookie.html', function(err, data){
  //         res.end(data);
  //     });
  // }
// })
// router.get('/', (req, res, next)=>{
//   if(req.cookies.name){    // cookies.name이 존재하면 true
//     global.visit_count += 1
//     res.send(`
//       <h1>welcome ${req.cookies.name}, ${global.visit_count}번째 방문입니다.</h1>
//       <h3><a href=/clearCookies>쿠키 삭제하기</a></h3>
//       <img src="http://gg.gg/mulxu">
//     `);
//   }else{
//     res.redirect('/setCookie.html')
//   }
// })

// router.get('/setCookie*', (req, res, next)=>{
//   global.visit_count = 0
//   console.log('req.query: ', req.query);
//   res.writeHead(302, {'Set-Cookie':`name=${req.query.name}`, 'Location': '/'});
//   res.send();
// })

// router.get('/clearCookies', (req, res, next)=>{
//   console.log('쿠키 삭제')
//   res.writeHead(302, {'Set-Cookie':'name=; Max-Age=0', 'Location': '/'})
//   res.send();
// })

router.get('/', function(req, res) {
  console.log('/ 요청')
  res.send('<h1>Birds home page</h1>');
});

module.exports = router;
