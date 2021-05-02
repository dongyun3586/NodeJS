var path = require('path');

// 경로관련 전역변수
console.log(__dirname);   //현재 디렉토리 경로 전역변수
console.log(__filename);  //현재 파일 경로 전역변수

// path 모듈 메소드(전체 경로에서 필요한 부분만 추출)
console.log(path.dirname(__filename)); // 디렉토리 경로
console.log(path.extname(__filename)); // 파일 확장자
console.log(path.basename(__filename)); //파일 이름
console.log(path.parse(__filename));  // 경로를 분석한 내용을 객체로 변환

// path.join(): 인자들을 조합하여 새로운 경로 문자열 반환
let joinPath = path.join(__dirname, path.sep, '..', 'Chap02', path.sep, 'index.html');
console.log('joinPath : ' + joinPath);