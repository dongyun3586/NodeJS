var connection = require('./db')

exports.selectMember = function(email, cb){
    connection.query('SELECT * FROM member WHERE email = ?', [email], function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}