// cookie를 체크하여 id, pw가 맞으면 true를 반환
exports.isItCertified = function (req, res){
    var certification = false;
    if(req.cookies.username === 'ldy' && req.cookies.password === '1111'){
        certification = true;
    }
    return certification;
}

// login 또는 logout을 화면에 표시하는 true/false값 반환
exports.authStatusUI = function(req, res){
    var isLogin = 0;  
    console.log(`isItCertified=${this.isItCertified(req, res)}`);
    if(this.isItCertified(req, res)){
        isLogin = 1;
    }
    return isLogin;
}