// 비동기 처리
//#region 1. 콜백 함수 사용
function delay(sec, callback){
    setTimeout(() => {
        callback(new Date().toTimeString());
    }, sec * 1000);
}

console.log('start: ', new Date().toTimeString());
delay(1, function(time){
    console.log(1, time);
    delay(1, function(time){
        delay(1, function(time){
            console.log(3, time);
        });
        console.log(2, time);
    });
});
//#endregion

//#region 2. Promise 사용
function delayP(sec){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve(new Date().toTimeString());
        }, sec * 1000);
    })
}

console.log('start ', new Date().toTimeString());
delayP(1)
    .then(function(time){
        console.log(1, time);
        return delayP(1);
    })
    .then(function(time){
        console.log(2, time);
        return delayP(1);
    })
    .then(function(time){
        console.log(3, time);
    })
    .catch(function(){
        console.log('error');
    })
//#endregion
