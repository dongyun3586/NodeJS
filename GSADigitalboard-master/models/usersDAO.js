var connection = require('./db')

exports.selectUser = function(email, cb){
    connection.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields) {
      //  console.log('breakpoint 3');
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}