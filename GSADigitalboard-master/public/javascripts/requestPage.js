var placeCode = document.getElementById("placeCode").innerHTML;
console.log('placeCode ', placeCode);

window.onload = ()=>{
    const delayTime = 1000 * 60
    setInterval(() => {
        window.location.href = `http://localhost:3000/notice/show_image/${placeCode}`
    }, delayTime);
}