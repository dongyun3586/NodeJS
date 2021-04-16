// async 키워드를 사용하면 Promise를 반환한다.
async function getUserId(userName){
    return userName +'userId'
}

getUserId('ldy')
    .then((userId)=>console.log(userId))