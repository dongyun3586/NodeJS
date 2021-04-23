var connection = require('./db')

exports.selectBookInfo = () => new Promise((resolve, reject)=>{
    connection.query('SELECT * FROM book_info', function (error, results, fields) {
        if(error) 
            reject(error);
        else 
            resolve(results);
    });
})