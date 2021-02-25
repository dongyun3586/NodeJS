var connection = require('./db')

// exports.selectUser = function(email, cb){
//     connection.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields) {
//         if(error){
//             console.log(error);
//         }else{
//             cb(results);
//         }
//     });
// }

exports.selectUser = (email)=> new Promise((resolve, reject)=>{
    connection.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields) {
        if(error){
            reject(error);
        }else{
            resolve(results);
        }
    });
})