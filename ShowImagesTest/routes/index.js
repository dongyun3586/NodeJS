var express = require('express');
var router = express.Router();

//#region 이미지 파일 처리
//파일관련 모듈
var multer = require('multer');

//파일 저장위치와 파일이름 설정
var storage = multer.diskStorage(
{
  destination: function (req, file, cb) {
    //파일이 이미지 파일이면
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
      console.log("이미지 파일이네요")
      cb(null, 'public/images')
      //텍스트 파일이면
    } else if (file.mimetype == "application/pdf" || file.mimetype == "application/txt" || file.mimetype == "application/octet-stream") {
      // console.log("텍스트 파일이네요")
      cb(null, 'public/texts')
    }
  },
    //파일이름 설정
    filename: function (req, file, cb) {
      const date = new Date();
      cb(null, `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${file.originalname.replace(/(\s*)/g, "")}`)       // 2021-5-24-iu12.jpg
      console.log('filename', `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${file.originalname.replace(/(\s*)/g, "")}`);
  }
})

var upload = multer({ storage: storage }) //파일 업로드 모듈
//#endregion

router.get('/', function(req, res, next) {
  console.log('req.file', req.file)
  if(req.file!==undefined)
    var imagesPath = req.file.substring(6)
  res.render('index', { title: 'Express', imagePath: imagesPath });
});

router.post('/write', upload.single('image_file'), (req, res)=>{
  console.log('req.file.path', req.file.path.substring(14))
  res.render('index', { title: 'Express', imagePath: req.file.path.substring(6)})
})

module.exports = router;
