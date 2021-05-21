var connection = require('./db')

// 새로운 사용자 추가
exports.insertMember = (body) => new Promise((resolve, reject)=>{
    console.log('body ', body);
    const query = 'INSERT INTO member VALUES(?,?,?,?,?)'
    connection.query(query, 
        [body.email, body.pwd, body.name, 'B', body.phone],
        function (error, results, fields) {
        if(error) 
            reject(error);
        else 
            resolve(results);
    });
})

// 입력된 email 값으로 사용자 데이터 가져오기
exports.selectMember = (email) => new Promise((resolve, reject)=>{
    const queay = 'SELECT * FROM member WHERE email = ?'
    connection.query(queay, [email], function (error, results, fields) {
        if(error) 
            reject(error);
        else 
            resolve(results);
    });
})














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