var connection = require('./db')

exports.selectUser = (email) => new Promise((resolve, reject)=>{
    const query = 'SELECT * FROM user WHERE email = ?'
    connection.query(query, [email], function (error, results, fields) {
        //  console.log('breakpoint 3');
          if(error){
            reject(error);
          }else{
            resolve(results);
          }
      })
})
exports.selectAllUsers = () => new Promise((resolve,reject)=>{
    connection.query('SELECT * FROM user',function(error, results, fields){
      if(error)reject(error);
      else resolve(results);
    })
})
exports.delete= (email)=> new Promise((resolve,reject)=>{
  const query='DELETE FROM user WHERE email = ?'
  connection.query(query,[email],function(error, results ,fields){
    if(error)reject(error);
    else resolve(results);
  })
})
exports.Add_user=(name,email,pwd,role,level)=>new Promise((resolve,reject)=>{
  const query = 'insert into user(email,pwd,name,role,level) VALUES (?,?,?,?,?)'
  console.log("----------",name,email,pwd,role,level);
  if(!(level==1||level==2||level==3))reject(error);
  
  connection.query(query,[email,pwd,name,role,level],function(error,results,fiedls){
    if(error)reject(error);
    else resolve();
  })
})
// exports.selectUser = function(email, cb){
//     connection.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields) {
//       //  console.log('breakpoint 3');
//         if(error){
//             console.log(error);
//         }else{
//             cb(results);
//         }
//     });
// }