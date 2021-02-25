var connection = require('./db')

exports.selectUser = function(email, cb){
    connection.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}

exports.selectAllUsers = (cb)=>{
    connection.query('SELECT * FROM user', (error, results, fields)=>{
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    })
}

exports.insertNewUser = (body, cb)=>{
    sql = 'INSERT INTO user VALUES(?, ?, ?, ?)';
    values = [body.email, body.pwd, body.name, body.role];
    connection.query(sql, values, (error, results, fields)=>{
        if(error){
            console.log(error);
        }else{
            cb();
        }
    })
}

exports.deleteUser = (email, cb)=>{
    sql = 'DELETE FROM user WHERE email = ?';
    values = [email]
    connection.query(sql, values, (error, results, fields)=>{
        if(error){
            console.log(error);
        }else{
            cb();
        }
    })
}