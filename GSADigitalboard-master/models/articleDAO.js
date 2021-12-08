var connection = require('./db')

// 이미지 게시물
exports.selectShowImage = (requn, show_time) => new Promise((resolve, reject)=>{
    //console.log('exports.selectShowImage show_time : ', show_time)
    const query = 'SELECT * FROM article WHERE date_start_post<=date(now()) and date_end_post>=date(now()) and type=? and (place & ?) != 0 and (show_time & ?) != 0'
    connection.query(query, ['image', requn, show_time], function (error, results, fields){
        if(error){
            reject(error);
        }
        else{
            resolve(results);
        }
    })
})

// 동영상 게시물
exports.selectShowVideo = (requn, show_time) => new Promise((resolve, reject)=>{
    const query = 'SELECT * FROM article WHERE date_start_post<=date(now()) and date_end_post>=date(now()) and type=? and (place & ?) !=0 and (show_time & ?) != 0';
    connection.query(query, ['video',requn, show_time], function (error, results, fields){
        if(error)
            reject(error);
        else
            resolve(results);
    })
})

// 게시물 추가
exports.insertArticle = (body, placeSum, imgFilename, writerEmail, fileType, show_time)=> new Promise((resolve, reject)=>{
    let query = `INSERT INTO article(title, date_start_post, date_end_post, place, file_path, writer_email, message, type, show_time, play_sound) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(query, [body.title, body.date_start_post, body.date_end_post, placeSum, imgFilename, writerEmail, body.message, fileType, show_time, body.play_sound],
    function(error, results, fields){
        if(error){
            reject(error);
        }else{
            resolve(results);
        }
    });
})

// 전체 게시물 목록(최신순)
exports.selectArticles=()=>new Promise((resolve, reject)=>{
    let query = 'SELECT * FROM article ORDER BY idarticle DESC';
    connection.query(query, (error, results, fields)=>{
        if(error){
            reject(error);
        }else{
            resolve(results);
        }
    })
})

// idarticle로 게시물 조회
exports.selectArticleById = (id)=>new Promise((resolve, reject)=>{
    let sql = 'SELECT * FROM article WHERE idarticle = ?'
    connection.query(sql, [id], (error, results, fields)=>{
        if(error){
            reject(error);
        }else{
            resolve(results);
        }
    })
})

// idarticle로 게시물 삭제
exports.deleteArticleById = (idarticle)=>new Promise((resolve, reject)=>{
    sql = 'DELETE FROM article WHERE idarticle = ?'
    connection.query(sql, [idarticle], function(error, results, fields){
        if(error){
            reject(error);
        }else{
            resolve();
        }
    })
})

// idarticle로 게시물 업데이트
exports.updateArticleById = (body, placeSum, writerEmail, idarticle, showTimeSum)=>new Promise((resolve, reject)=>{
    let query = 'UPDATE article SET title = ?, date_start_post = ?, date_end_post = ?, place = ?, writer_email = ?, message = ?, show_time = ?, play_sound = ? WHERE idarticle = ?'
    connection.query(query, [body.title, body.date_start_post, body.date_end_post, placeSum, writerEmail, body.message, showTimeSum, idarticle, body.play_sound], 
        function(error, results, fields){
        if(error){
            reject(error);
        }else{
            resolve();
        }
    })
})



