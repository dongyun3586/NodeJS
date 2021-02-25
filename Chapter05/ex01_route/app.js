var express = require('express');
var app = express();                // app은 express의 인스턴스
const port = 3000

//#region 1. Hello world 예제
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
//#endregion

//#region 2. 기본 라우팅
// 라우팅은 URL과 HTTP요청메소드(GET, POST 등)인 특정 엔드포인트에 대한 클라이언트 요청에 대한 응답
// 각 라우트는 하나 이상의 핸들러 함수를 가질 수 있으며, 이러한 함수는 라우트가 일치할 때 실행된다.
app.get('/', (req, res) => res.send('<h1>Get request</h1>'))
app.post('/', (req, res) => res.send('<h1>Post request</h1>'))

app.get('/book', (req, res) => res.send('<h1>Get a book</h1>'))
app.post('/book', (req, res) => res.send('<h1>Add a book</h1>'))
app.put('/book', (req, res) => res.send('<h1>Update a book</h1>'))
app.delete('/book', (req, res) => res.send('<h1>Delete a book</h1>'))

// app.route()를 이용한 라우트 체인 => 중복과 오타 감소
app.route('/user')
    .get((req, res) => res.send('<h1>Get a user</h1>'))
    .post((req, res) => res.send('<h1>Add a user</h1>'))
    .put((req, res) => res.send('<h1>Update a user</h1>'))
    .delete((req, res) => res.send('<h1>Delete a user</h1>'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
//#endregion

//#region 3. express.Router 클래스
var indexRouter = require('./routes/index');
var birds = require('./routes/birds');

app.use('/', indexRouter);
app.use('/birds', birds);
//#endregion

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


