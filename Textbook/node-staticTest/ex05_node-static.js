var static = require('node-static');
var fileServer = new static.Server('./public');

require('http').createServer(function (request, response) {
 request.addListener('end', function () {
  fileServer.serve(request, response, function (err, result) {
   if (err) { 
    console.error(err.message);
    response.writeHead(err.status, err.headers);
    response.end();
   }
  });
 }).resume();
}).listen(8080);