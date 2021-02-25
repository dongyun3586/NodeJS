var printHello = require('./printHello');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("반복 횟수를 입력하시오.");
rl.on('line', function(input){
  printHello(input);
  rl.close();
});