// process는 전역객체 global에 포함된 객체이다.
// console.log(process.env);
// console.log(process.arch);
// console.log(process.platform);

// 터미널에서 매개변수를 입력받을 수 있다.  예) node processTest.js 10 20
for(var i=0; i<4; i++)
  console.log('process.argv[' + i + '] ' + process.argv[i]);

var add = (a, b) => a+b;
console.log('a + b = ' + add(parseInt(process.argv[2]), parseInt(process.argv[3])));  

// process의 'exit' 이벤트가 발생하면 호출됨.
process.on('exit', function(){
  console.log('end');
});

// process.exit();






