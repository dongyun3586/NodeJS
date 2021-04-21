var connection = require('./db')

//#region 1. Callback
// exports.selectMember = function(email, cb){
//     connection.query('SELECT * FROM member WHERE email = ?', [email], function (error, results, fields) {
//         if(error){
//             console.log(error);
//         }else{
//             cb(results);
//         }
//     });
// }
//#endregion

//#region 2. Promise
exports.selectMember = (email) => new Promise((resolve, reject)=>{
    connection.query('SELECT * FROM member WHERE email = ?', [email], function (error, results, fields) {
        if(error) 
            reject(error);
        else 
            resolve(results);
    });
})

//#endregion

