const fs = require('fs');

//#region 1. write stream
// 1-1. 텍스트 파일에 쓰기
const ws = fs.createWriteStream('./readme.txt');  //데이터를 file에 기록할 수 있는 writeStream
ws.write('스트림은 Node.js에서\n');
ws.write('스트리밍 데이터로 작업하기위한\n');
ws.write('추상 인터페이스\n');

// // writable.end () 메서드를 호출하면 더 이상 데이터가 Writable에 기록되지 않는다는 신호
// ws.end('end()함수 실행');  // 스트림을 닫기 직전에 하나의 최종 추가 데이터 청크를 쓸 수 있다.

// // 'finish'이벤트는 stream.end() 메서드가 호출되고, 모든 데이터가 flush 된 후에 발생
ws.on('finish', function(){
  console.log('파일 스트림 finish 이벤트 발생');
});

// 1-2. 터미널에서 입력받은 텍스트를 파일에 쓰기
// 터미널 표준 입력 이벤트 : 'readable'
// 스트림에 읽을 수 있는 데이터가있을 때 'readable'이벤트가 발생한다.
process.stdin.on('readable', function(){
  console.log('읽을 수 있는 데이터가 있음.');
  let data;

  while((data = this.read()) !== null){  // this === process.stdin
    ws.write(data);

    // 'exit'라는 string 이 입력되면 빠져나간다.
    if(data.toString() === 'exit\r\n'){
      console.log('입력 상태 종료')
      ws.end('end()함수 실행')
      break;
    }  
  }
});
//#endregion

//#region 2. read stream 
// flowing 모드일 때, 만약 이것을 수신할 수신자가 없으면 데이터는 사라지게 된다.
// 스트림은 이벤트 기반으로 동작한다.(data, end, error....)
// flowing 모드일 경우에는 데이터가 연속적으로 흐르고 있어 이벤트(data 이벤트와 end 이벤트)로 처리해야 한다.
const rs = fs.createReadStream('./readme.txt', {highWaterMark: 8});  // chunk의 크기 8byte
const data = [];  // stream으로 넘어오는 데이터를 저장할 배열

// 청크(버퍼)들이 들어올 때마다 data 이벤트 발생
// 스트림에 읽을 데이터가 없을 때까지 data 이벤트 발생
rs.on('data', (chunk)=>{
  data.push(chunk);  // data 리스트에 추가
  console.log('chunk: ', chunk, chunk.length);
});

// 더 이상 읽어올 데이터가 없으면 end 이벤트 발생
rs.on('end', function(){
  console.log('end: ', Buffer.concat(data).toString('utf8'));
});

// 에러 처리
rs.on('error', (err)=>console.log(err))
//#endregion

// // 3. pipe
// Readable.pipe() 메서드는 readable 스트림을 연결된 writeable 스트림으로 푸시한다.
// readStream과 writeStream을 연결하여 파일이 복사되는 결과를 낳는다.
const rs = fs.createReadStream('./readme.txt');
const ws = fs.createWriteStream('./readme2.txt');

// 읽을 수있는 모든 데이터는 ws로 이동한다.
rs.pipe(ws);

// pipe stream chain
// Readable.pipe() 메서드는 파이프 스트림의 체인을 설정할 수 있도록 대상 스트림에 대한 참조를 반환한다.
const z = require('zlib').createGzip();  // 파일 압축 스트림
const w = fs.createWriteStream('file.txt.gz');
rs.pipe(z).pipe(w);

// // 새로운 기능(내부적으로 스트림으로 처리)
// const readStream = fs.copyFile('./write2.txt', './write3.txt', (err)=>console.log(err))








