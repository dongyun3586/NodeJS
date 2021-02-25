var connection = require('./db')

exports.selectDrama = () => new Promise((resolve, reject)=>{
    connection.query('SELECT * FROM drama', function (error, results, fields) {
        if(error){
            reject(error);
        }else{
            resolve(results);
        }
    })
});

exports.insertDrama = (body)=> new Promise((resolve, reject)=>{
    sql = 'INSERT INTO drama (title, actor) VALUES(?, ?)';
    values = [body.title, body.actor];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            reject(error);
        }else{
            resolve();
        }
    })
});

exports.updateDrama = (id, body)=> new Promise((resolve, reject)=>{
    sql = `UPDATE drama SET title = ?, actor = ? WHERE id = ?`;
    values = [body.title, body.actor, id];
        connection.query(sql, values, function(error, results, fields){
        if(error){
            reject('UPDATE ERROR');
        }else{
            resolve();
        }
    })
})

exports.deleteDrama = (id)=> new Promise((resolve, reject)=>{
    sql = `DELETE FROM drama WHERE id = ${id}`;
    connection.query(sql, function(error, results, fields){
        if(error){
            reject('DELETE ERROR');
        }else{
            resolve();
        }
    })
})


