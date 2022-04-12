var obj = document.getElementsByName("showImage");
console.log('showImage ', obj.length);      // 게시된 이미지 수
var placeCode = parseInt(document.getElementById("placeCode").innerHTML);
var sectionNum = parseInt(document.getElementById("sectionNum").innerHTML);
console.log('placeCode ', placeCode);
console.log('sectionNum ', sectionNum)

// O초마다 차례 대로 스크롤하며 보여주기
window.onload = ()=>{
    let img_length = obj.length;
    let numberOfIterations = 3;
    const showInterval = 10000;
    const sectionList = []
    for (let i = 0; i < img_length; i++) {
        sectionList.push('#img'+i);             // const sectionList = ['#img0', '#img1', '#img2']
    }
    // console.log('sectionList', sectionList);
    let index = 1;
    if(img_length===1){
        index = 0
    }
    
    let target;
    let count = img_length * numberOfIterations - 1;     // 게시되는 이미지 수 * 반복 횟수

    setInterval(() => {
        target = $(sectionList[index++]);
        console.log('target = ', target);  // target S.fn.init [section#img0.page-section]
        $('html, body').animate(
        {
            scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        index %= sectionList.length;    

        console.log('count = ', count--);                                    
        if(count < 0){
            console.log('goto video');
            window.location.href = `http://10.122.2.105:3000/notice/show_video/0/${placeCode}/${sectionNum}`; // 특정 url 요청
        }
    }, showInterval);
}
