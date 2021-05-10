const http = require('http')

const server = http.createServer(function(req, res){
    res.write('<h1>Wecome')
    res.end(' to my server</h1>')
  }).listen(8080, function(){
    console.log('8080 포트에서 대기중')
  })