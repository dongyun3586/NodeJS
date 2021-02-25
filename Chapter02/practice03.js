// // 1. addSync()함수를 동기식으로 만들고 1초 뒤에 실행하시오.
// function addSync(a, b){
//   console.log('addSync : ');
//   console.log(a+b);
// }
// setTimeout(addSync, 1000, 1, 2);

// // 2. addAsync()함수를 비동기식으로 만들고, 1초 뒤에 실행하시오.
// function addAsync(a, b, callback){
//   console.log('addAsync : ');
//   var result = a + b;
//   callback(result);
// }

// setTimeout(addAsync, 1000, 1, 2, function(sum){
//   console.log(sum);
// });

// // 3. 다음 동기함수를 비동기로 수정하여 실행하시오.
// // 3-1. 동기식 처리
// var sync1 = function(param){ return param*2; }
// var sync2 = function(param){ return param*3; }
// var sync3 = function(param){ return param*4; }

// console.log(sync3(sync2(sync1(1))));

// 3-2 비동기식 처리
var async1 = function(param, callback){ callback(param * 2); }
var async2 = function(param, callback){ callback(param * 3); }
var async3 = function(param, callback){ callback(param * 4); }

async1(1, function(result1){
  console.log('result1 = ', result1);
  async2(result1, function(result2){
    console.log('result2 = ', result2);
    async3(result2, function(result3){
      console.log('result3 = ', result3);
      console.log(result3);
    });
  });
});
