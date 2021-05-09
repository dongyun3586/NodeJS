var mysql = require('mysql');

// Mysql 연결 connection 객체 생성
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1111',
    database : 'world'
  });

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

module.exports = connection;