var connection = require('./db')

exports.selectCountry = (body) => new Promise((resolve, reject)=>{
    const sql = 'SELECT name, population FROM country WHERE continent=? AND population >= ? ORDER BY population DESC'
    connection.query(sql, [body.continent, body.population], function (error, results, fields) {
        if(error) 
            reject(error);
        else 
            resolve(results);
    });
})