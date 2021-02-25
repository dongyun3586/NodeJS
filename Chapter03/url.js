const URL = require('url').URL;
// url 파싱 방법은 두 가지가 있다.

// // 1. WHATWG 방식 : full url이 필요하다.
// const myURL = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string1&query=string2&query2=string3#hash');
// console.log(myURL);  //객체로 파싱된 url

// // querystring을 추출하는 기능
// console.log(myURL.searchParams);
// console.log(myURL.searchParams.get('query'));
// console.log(myURL.searchParams.has('query2'));
// console.log(myURL.searchParams.getAll('query'));
// console.log(myURL.searchParams.keys());
// console.log(myURL.searchParams.values());


// 2. 이전 방식 : 부분 url도 처리할 수 있다.
var url = require('url');
var parsedURL = url.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string1&query=string2&query2=string3#hash');
console.log(parsedURL);  //객체로 파싱된 url

// querystring 모듈 사용
const querystring = require('querystring');
const query = querystring.parse(parsedURL.query);
console.log(query);

// Object.entries() 메서드는 for...in와 같은 순서로 주어진 객체 자체의 enumerable 속성 [key, value] 쌍의 배열을 반환
for (let [key, value] of Object.entries(query)) {
    console.log(`${key}: ${value}`);
}

// 3. 단축 URL을 사용하는 경우 WHATWG방식은 에러가 발생하는데, 이전 방식은 에러가 발생하지 않음.
// const myURL = new URL('/?num1=1&num2=2');
// var parsedURL2 = url.parse('/?num1=1&num2=2');
// console.log(parsedURL2);