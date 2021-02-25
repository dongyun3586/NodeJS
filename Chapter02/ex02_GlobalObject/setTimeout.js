function print(name, time, obj){
    console.log('%d초 뒤에 함수 호출', time/1000)
    console.log('hello %s', name);
    console.log('JSON %j', obj);
}

// 1. setTimeout()함수
// 1-1.  delayTime 초 뒤에 함수 호출
var delayTime = 1500;
setTimeout(() => {
    print('world', delayTime, {name: 'dongyun'});
}, delayTime);

// 1-2. setTimeout()함수의 참조 변수를 만들어, clearTimeout()함수로 실행을 정지할 수 있다.
// setTimeout()함수 원형: setTimeout(callback, delay[, ...args])
var st = setTimeout(print, 2000, 'world2', 2000, {name: 'dongyun'});

// clearTimeout(st);  // 실행 즉시 setTimeout() 함수를 정지시킴.

// 2. setInterval()함수
// 2-1 일정한 시간 간격으로 계속 실행
setInterval(() => {
    console.log('setInterval');
}, 1000);

// 2-2 setInterval() 함수의 참조 변수를 만들어, clearInterval()함수로 실행을 정지할 수 있다.
var si = setInterval(() => {
  console.log('setInterval2');
}, 1500);

// clearInterval(si);  // 실행 즉시 setInterval()함수를 정지시킴.


