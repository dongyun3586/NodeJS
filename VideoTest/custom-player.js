const media = document.querySelector('video');
// const controls = document.querySelector('.controls');

// const play = document.querySelector('.play');
// const stop = document.querySelector('.stop');
// const rwd = document.querySelector('.rwd');
// const fwd = document.querySelector('.fwd');

// const timerWrapper = document.querySelector('.timer');
// const timer = document.querySelector('.timer span');
// const timerBar = document.querySelector('.timer div');
// // 비디오에서 기본 브라우저 컨트롤을 제거하고 사용자 지정 컨트롤을 표시한다.
// media.removeAttribute('controls');
// controls.style.visibility = 'visible';

// // Playing and pausing the video
// play.addEventListener('click', playPauseMedia);

// function playPauseMedia() {
//     if(media.paused) {
//         play.setAttribute('data-icon','u');
//         media.play();
//     } else {
//         play.setAttribute('data-icon','P');
//         media.pause();
//     }
// }

// // Stopping the video
// media.addEventListener('ended', stopMedia);

// function stopMedia() {
//     media.pause();
//     media.currentTime = 0;
//     play.setAttribute('data-icon','P');
// }

media.play()
    .then(()=>{
        console.log('동영상 재생 성공')
    })
    .catch((error)=>{
        alert(error)
    })