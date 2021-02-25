// addListene와 on 이벤트 리스너는 동일하게 동작한다.
process.addListener('exit', function(){
  console.log('process.addListener');
});

process.on('exit', function(){
  console.log('process.on');
});

// once는 한 번만 동작한다.
process.once('exit', function(){
  console.log('process.once');
});

process.emit('exit');  // 이벤트를 발생시키는 메소드
