function delayP(sec){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve(new Date().toTimeString());
        }, sec * 3000);
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