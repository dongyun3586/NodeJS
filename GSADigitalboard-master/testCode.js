let today = new Date();   
let hours = today.getHours(); // 시
let minutes = today.getMinutes();  // 분
let currentTime = hours*60+minutes;
const time_list = [530, 590, 650, 710, 810, 870, 930, 1000, 1060, 1110, 1170, 1230, 1290, 1440]

console.log(hours + ':' + minutes)
console.log(currentTime);
console.log(calcShowTime(currentTime, time_list));

function calcShowTime(currentTime, time_list){
    for(var i=0; i<14; i++){
        if(currentTime < time_list[i]){
            return i+1;
        }
    }
}
