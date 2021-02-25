// node-static 서드파티 모듈을 이용하여 정적 파일을 서비스 한다. 
var static = require('node-static');

var file = new static.Server('./public');  // 정작 파일들이 저장된 디렉토리 경로

require('http').createServer(function(request, response){
  request.addListener('end', function(){
    file.serve(request, response, function (e, res) {
      if (e && (e.status === 404)) { // If the file wasn't found
          file.serveFile('/not-found.html', 404, {}, request, response);
      }
  });
  }).resume();
}).listen(8080);