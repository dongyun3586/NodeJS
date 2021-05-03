var myModule1 = require('./myModule1');
var myModule2 = require('./myModule2')

console.log('myModule1을 사용한 사칙연산 결과')
console.log(myModule1.add(1, 2))
console.log(myModule1.subtract(1, 2))
console.log(myModule1.multiply(1,2))
console.log(myModule1.divide(1, 2))

console.log('myModule2을 사용한 사칙연산 결과')
console.log(myModule2.add(1, 2))
console.log(myModule2.subtract(1, 2))
console.log(myModule2.multiply(1,2))
console.log(myModule2.divide(1, 2))