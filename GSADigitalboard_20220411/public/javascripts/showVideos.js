const vid = document.getElementById("myVideo");
const playSound = document.getElementById("play_sound").innerHTML

console.log('playSound : ', playSound)
vid.muted=true;
if(playSound==='1'){
    vid.muted=false;
}

// 동영상이 끝나면 다음 동영상으로 넘어가기
vid.onended = function() {
    document.getElementById("gotoLINK").click();
};