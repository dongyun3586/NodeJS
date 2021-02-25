var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dramaList.db');  // 데이터베이스 생성 또는 오픈

// db.serialize() 데이터베이스 메소드 순차 실행
db.serialize(function(){
    // 테이블 생성
    db.run(`CREATE TABLE dramaTable (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        actor TEXT NOT NULL)`,
    function(err){
        if(err){
            console.log(err.message);
        }else{
            console.log('table created');
        }
    } );

    // 샘플 데이터 추가
    db.run(`INSERT INTO dramaTable (title, actor) VALUES ("나의 아저씨", "아이유, 이선균")`,
        function(err){
            if(err){
                console.log(err.message);
            }else{
                console.log('data inserted');
            }
        }
    );
});








