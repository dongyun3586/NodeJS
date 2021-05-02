var path = require('path');

console.log(__dirname);   //현재 디렉토리 경로 전역변수
console.log(__filename);  //현재 파일 경로 전역변수

console.log(path.dirname(__filename)); // 디렉토리 경로
console.log(path.extname(__filename)); // 확장자
console.log(path.basename(__filename)); //파일 이름
console.log(path.parse(__filename));  // 분석한 내용 객체로 변환

// path.format()함수는 객체로부터 path string을 반환한다.
var newPath = path.format({ root: 'D:\\',
dir: 'D:\\Repository2019\\Node01',
base: 'path.js',
ext: '.js',
name: 'path' });
console.log('newPath : ' + newPath);

// path.join() : 인자들을 조합하여 새로운 경로 string을 만든다.
var createPath = path.join(
  __dirname, 
  path.sep, 
  '..',
  'Chapter02', 
  path.sep, 
  'index.html'
);
console.log('createPath : ' + createPath);

