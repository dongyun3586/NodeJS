const fs = require('fs')
const fs_p = require('fs/promises')

//#region 파일 읽기

// // 1. 동기식 파일 읽기
// try {
//   let data = fs.readFileSync('./readme.txt', 'utf8');
//   console.log(data);
// } catch (error) {
//   console.log(error.message);
// }

// // 2. 콜백 함수를 사용한 비동기식 파일 읽기
// fs.readFile('./readme.txt', 'utf8', function(err, data){
//   if(err){
//     console.log(err.message);
//   }else{
//     console.log(data);
//   }
// });

// // 3. Promise를 사용한 비동기식 파일 읽기
// fs_p.readFile('./readme.txt', 'utf8')
//   .then(console.log)
//   .catch((reason)=>console.log(reason.message))

//#endregion

//#region 파일 쓰기
// // 콜백 함수를 사용한 비동기식 파일 쓰기
// fs.writeFile('./writeFile.txt', 'fs.writeFile Data', function(err){
//   if(err) console.log(err);
//   fs.readFile('./write.txt', 'utf8', function(err, data){
//     console.log(data);
//   });
// });

// fs_p.writeFile('./writeFile.txt', '안녕하세요')
//   .then(console.log('파일 쓰기 성공'))
//   .catch((reason)=>console.log(reason.message))
//#endregion

//#region 파일 읽고 쓰기
fs_p.readFile('./readme.txt', 'utf8')
  .then((data)=>fs_p.writeFile('./writeFile.txt', data))
  .then(console.log('파일 쓰기 성공'))
  .catch((reason)=>console.log(reason.message))


//#endregion

//#region 기타
// 5. 파일에 내용 추가하기
// fs.appendFile('./write.txt', '\nGSM', (err)=>console.log(err));

// // 6. 파일 존재 여부 확인
// fs.access('./write.txt', fs.F_OK | fs.R_OK, function(err){
//   console.log(err);
// });

// // 7. 디렉토리 생성하기
// fs.mkdir('./testDir', function(err){

// });

// // 8. 디렉토리 읽기
// fs.readdir('./', function(err, files){
//   console.log(files);
// });
//#endregion

