// let videoElem = document.getElementById("video");
// let playButton = document.querySelector('.play');

// playButton.addEventListener("click", handlePlayButton, false);

// async function playVideo() {
//   try {
//     await videoElem.play();
//     playButton.classList.add("playing");
//   } catch(err) {
//     playButton.classList.remove("playing");
//   }
// }

// function handlePlayButton() {
//   if (videoElem.paused) {
//     playVideo();
//   } else {
//     videoElem.pause();
//     playButton.classList.remove("playing");
//   }
// }

// window.onload = function () {
//     alert("로딩 완료");
//     setTimeout(()=>{
//         await videoElem.play();
//     }, 1000);
// }

setInterval(() => {
    console.log("Hello world")
}, 5000);
