var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);  // http (HTTP 서버) 객체를 전달하여 socket.io 인스턴스 초기화

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

http.listen(3000, () => {
  console.log('listening on *:3000');
});