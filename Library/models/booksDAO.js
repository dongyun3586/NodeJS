var connection = require('./db')

// 보유 도서 리스트 검색
exports.selectBookInfoList = () => new Promise((resolve, reject)=>{
    let query = `SELECT * FROM book_info`
    connection.query(query, function (error, results, fields) {
        if(error) 
            reject(error);
        else 
            resolve(results);
    });
})

// 키워드를 이용한 도서 검색
exports.selectBookList = (body) => new Promise((resolve, reject)=>{
    let query = keywordsParse(body);
    console.log('query', query);
    connection.query(query, function (error, results, fields) {
        if(error) 
            reject(error);
        else 
            resolve(results);
    });
})

// 키워드 조합을 이용한 쿼리문 생성
function keywordsParse(body){
    let base = `SELECT books.book_code, info.book_name, info.author, info.publisher, books.rent_allow FROM books JOIN book_info AS info ON books.ISBN = info.ISBN`
    let keyword_count = keywordCount(body)  
    if(keyword_count==0)
        return base;
    else if(keyword_count==3){
        return `${base} WHERE info.book_name LIKE '%${body.bookname[0]}%' ${body.bookname[1]} info.author LIKE '%${body.author[0]}%' ${body.author[1]} info.publisher LIKE '%${body.publisher}%'`
    }else if(keyword_count==2){
        if(body.bookname[0]=='')
            return `${base} WHERE info.author LIKE '%${body.author[0]}%' ${body.author[1]} info.publisher LIKE '%${body.publisher}%'`
        else if(body.author[0]=='')
            return `${base} WHERE info.book_name LIKE '%${body.bookname[0]}%' ${body.bookname[1]} info.publisher LIKE '%${body.publisher}%'`
        else
            return `${base} WHERE info.book_name LIKE '%${body.bookname[0]}%' ${body.bookname[1]} info.author LIKE '%${body.author[0]}%'`
    }else{
        if(body.bookname[0]!='') return `${base} WHERE info.book_name LIKE '%${body.bookname[0]}%'`
        if(body.author[0]!='') return `${base} WHERE info.author LIKE '%${body.author[0]}%'`
        if(body.publisher[0]!='') return `${base} WHERE info.publisher LIKE '%${body.publisher}%'`
    }

  }

// 입력된 키워드 개수 리턴
function keywordCount(body){
    count=0
    if(body.bookname[0]!='') count++;
    if(body.author[0]!='') count++;
    if(body.publisher[0]!='') count++;
    return count;
}

// 도서 대출 처리 => rent 테이블에 대출 정보 삽입
exports.insertRentInfo = (rent_datetime, email, book_code, cb) => {
    const query = `INSERT INTO rent (rent_datetime, email, book_code) VALUES('${rent_datetime}', '${email}', ${book_code})`;
    connection.query(query, function (error, results, fields) {
        if(error) 
            console.log(error);
        else 
            cb();
    });
}

// 도서 대출 상태 업데이트 => books 테이블
exports.updateRentAllow = (book_code, value, cb) =>{
    let query = `UPDATE books SET rent_allow = ${value} WHERE book_code=${book_code}`;
    console.log(query) 
    connection.query(query, function (error, results, fields) {
        if(error) 
            console.log(error);
        else 
            cb();
    });
}

// 도서 반납 상태 업데이트
exports.updateReturnDatetime = (book_code, return_datetime, cb) => {
    const query = `UPDATE rent SET return_datetime = '${return_datetime}' WHERE book_code = '${book_code}'`
    connection.query(query, function (error, results, fields) {
        if(error) 
            console.log(error)
        else 
            cb()
    })
}

exports.selectRentBookList = (email)=> new Promise((resolve, reject)=>{
    const query = `SELECT books.book_code, info.book_name, info.author, info.publisher,  rent.rent_datetime, rent.return_datetime FROM books 
                INNER JOIN book_info info ON books.ISBN = info.ISBN 
                INNER JOIN rent ON rent.book_code = books.book_code 
                WHERE rent.return_datetime is NULL AND books.book_code IN (SELECT book_code FROM rent WHERE email = '${email}')`
    connection.query(query, function (error, results, fields) {
        if(error) 
            reject(error);
        else 
            resolve(results);
    });
})

exports.selectCountRentBooks = (email)=> new Promise((resolve, reject)=>{
    // let query = `SELECT books.book_code, info.book_name, info.author, info.publisher FROM books JOIN book_info AS info ON books.ISBN = info.ISBN 
    //             WHERE books.book_code IN (SELECT book_code FROM rent WHERE email = '${email}')`
    let query = `SELECT count(*) FROM books 
                INNER JOIN book_info info ON books.ISBN = info.ISBN 
                INNER JOIN rent ON rent.book_code = books.book_code 
                WHERE books.book_code IN (SELECT book_code FROM rent WHERE email = '${email}')`
    console.log('query', query);
    connection.query(query, function (error, results, fields) {
        if(error) 
            reject(error);
        else 
            resolve(results);
    });
})





// exports.insertRentInfo = (rent_datetime, email, book_code, cb) => new Promise((resolve, reject)=>{
//     let query = `INSERT INTO rent (rent_datetime, email, book_code) VALUES('${rent_datetime}', '${email}', ${book_code})`;
//     console.log(query) 
//     connection.query(query, function (error, results, fields) {
//         if(error) 
//             reject(error);
//         else 
//             resolve(results);
//     });
// })

