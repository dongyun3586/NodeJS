var connection = require('./db')

exports.selectUser = (email)=> new Promise((resolve, reject)=>{
    connection.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields) {
        if(error){
            reject(error);
        }else{
            resolve(results);
        }
    });
})