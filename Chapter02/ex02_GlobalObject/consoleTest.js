// 1. REPL 에서 'console' 출력해보기

// 2. console 메소드
const obj = {
  outside: {
    inside: {key: 'value'}
  }
}

console.log('로그 출력')
console.error('에러 메시지 출력')

// 객체 출력
console.dir(obj, {color: false, depth: 2})
console.dir(obj, {color: true, depth: 1})

// 특정 코드가 실행되는 시간을 측정할 수 있다.
console.time('반복문 실행 시간');
for(var i=0; i<1000000; i++){
  continue;
}
console.timeEnd('반복문 실행 시간');