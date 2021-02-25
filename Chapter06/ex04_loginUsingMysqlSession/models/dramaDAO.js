var connection = require('./db')

// [{"id":1,"title":"나의 아저씨","actor":"아이유, 이선균"},{"id":2,"title":"미스터 션샤인","actor":"이병헌, 김태리"},{"id":11,"title":"스타트업","actor":"수지, 남주혁"}]
exports.selectDrama = function(cb){
    connection.query('SELECT * FROM drama', function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}

exports.insertDrama = function(body, cb){
    sql = 'INSERT INTO drama (title, actor) VALUES(?, ?)';
    values = [body.title, body.actor];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            cb();
        }
    })
}

exports.updateDrama = function(id, body, cb){
    sql = `UPDATE drama SET title = ?, actor = ? WHERE id = ?`;
    values = [body.title, body.actor, id];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            console.log('UPDATE ERROR');
        }else{
            cb();
        }
    })
}

exports.deleteDrama = function(id, cb){
    sql = `DELETE FROM drama WHERE id = ${id}`;
    connection.query(sql, function(error, results, fields){
        if(error){
            console.log('DELETE ERROR');
        }else{
            cb();
        }
    })
}


