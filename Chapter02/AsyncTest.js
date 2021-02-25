// 1. 동기식 add() 함수
function addSync(a, b){
  return a+b;
}

console.log('before')
var result = addSync(1,2)
console.log('after')
console.log(result)

// 2. 비동기식 add() 함수
function addAsync(a, b, callback){
  setTimeout(() => {
    callback(a+b);
  }, 1000);
}

console.log('before');
addAsync(1, 2, function(result){
  console.log(result);
});
console.log('after');


