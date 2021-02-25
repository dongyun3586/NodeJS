//#region  1. 콜백 함수를 사용한 비동기 처리 => 콜백지옥 예시
// var fs = require('fs');

// fs.access('./readme.txt', function(err){  // 파일 존재 여부 체크
//     if(err){
//         console.log(err.message)
//         fs.writeFile('./readme.txt', 'hello node.js', (err)=>console.log(err))
//     }else{
//         fs.readFile('./readme.txt', function(err, data){  // 파일 읽어오기
//             if(err){
//                 console.log(err.message);   
//             }else{
//                 console.log(data.toString('utf8')); // 'hello node.js'
//                 var newData = data.toString().replace('node.js', 'world');  // 일부 텍스트 수정
//                 fs.writeFile('./readme.txt', newData, function(err){  // 수정된 내용으로 파일 작성
//                     if(err){
//                         console.log(err.message);
//                     }else{
//                         fs.readFile('./readme.txt', function(err, data){
//                             if(err){
//                                 console.log(err.message)
//                             }else{
//                                 console.log(data.toString());   // 'hello world'
//                             }
//                         })
//                     }
//                 })
//             }
//         })
//     }
// })
//#endregion

//#region 2. Promise를 사용한 비동기 처리
// var fsPromise = require('fs').promises;

// fsPromise.access('./readme.txt')
//     .catch(()=>fsPromise.writeFile('./readme.txt', 'hello world'))
//     .then(()=>fsPromise.readFile('./readme.txt'))
//     .then((data)=>{
//         console.log(data.toString());
//         var newData = data.toString().replace('world', 'node.js');
//         return fsPromise.writeFile('./readme.txt', newData);
//     })
//     .then(()=>fsPromise.readFile('./readme.txt'))
//     .then((data)=>console.log(data.toString()))
//     .catch(()=>console.log('error'))
//#endregion

//#region 3. async, await를 이용한 비동기 처리
var fsPromise = require('fs').promises;

// Promise를 사용하는 깔끔한 스타일 => 비동기를 마치 동기코드처럼 작성(syntactic sugar)
// (async ()=>{
//     try {
//         await fsPromise.access('./readme.txt');
//     } catch (error) {
//         await fsPromise.writeFile('./readme.txt', 'hello node.js');        
//     }
//     let data = await fsPromise.readFile('./readme.txt');
//     console.log(data.toString());
//     var newData = data.toString().replace('node.js', 'world');
//     await fsPromise.writeFile('./readme.txt', newData);
//     data = await fsPromise.readFile('./readme.txt');
//     console.log(data.toString());
// })()

async function asyncFunc(){
    try {
        await fsPromise.access('./readme.txt');
    } catch (error) {
        await fsPromise.writeFile('./readme.txt', 'hello node.js');        
    }
    let data = await fsPromise.readFile('./readme.txt');
    console.log(data.toString());
    var newData = data.toString().replace('node.js', 'world');
    await fsPromise.writeFile('./readme.txt', newData);
    data = await fsPromise.readFile('./readme.txt');
    console.log(data.toString());
}

asyncFunc();
//#endregion






