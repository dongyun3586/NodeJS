// url 파싱 방법은 두 가지가 있다. {WHATWG URL 표준 방식, Node.js 전용 레거시 API}

const urlString = 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string1&query=string2&query2=string3#hash'

//#region 1. WHATWG 방식(full url만 처리 가능)
// // 객체로 파싱된 url
var myURL = new URL(urlString);
console.log(myURL);  

// searchParams를 추출하는 기능
console.log(myURL.searchParams);
console.log(myURL.searchParams.get('query'));
console.log(myURL.searchParams.has('query'));
console.log(myURL.searchParams.getAll('query'));
console.log(myURL.searchParams.keys());
console.log(myURL.searchParams.values());
//#endregion

//#region 2. Node.js 전용 레거시 API(부분 url도 처리 가능)
var url = require('url');

// 객체로 파싱된 url
var myURL = url.parse(urlString);
console.log(myURL);  

// query
console.log(myURL.query)

// querystring 모듈 사용
const querystring = require('querystring');
const query = querystring.parse(myURL.query);
console.log('querystring.parse(): ', query);
console.log('querystring.stringify(): ', querystring.stringify(query))  // 하나의 문자열로 합치기

// Object.entries() 메서드는 for...in와 같은 순서로 주어진 객체 자체의 enumerable 속성 [key, value] 쌍의 배열을 반환
for (let [key, value] of Object.entries(query)) {
    console.log(`${key}: ${value}`);
}
//#endregion

// 3. 단축 URL을 사용하는 경우 WHATWG방식은 에러가 발생하는데, 이전 방식은 에러가 발생하지 않음.
// const shortURL = new URL('/?num1=1&num2=2');  // error : Invalid URL
var parsedURL = url.parse('/?num1=1&num2=2');
console.log(parsedURL);