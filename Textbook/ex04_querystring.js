var url = require('url');
const querystring = require('querystring');

const urlString = 'https://example.com/?query=string1&query=string2&query2=string3#hash'
var myURL = url.parse(urlString);

const query = querystring.parse(myURL.query);
console.log(query);
console.log('querystring.stringify(): ', querystring.stringify(query))  // 하나의 문자열로 합치기

// Object.entries() 메서드는 for...in와 같은 순서로 주어진 객체 자체의 enumerable 속성 [key, value] 쌍의 배열을 반환
for (let [key, value] of Object.entries(query)) {
    console.log(`${key}: ${value}`);
}


// 3. 단축 URL을 사용하는 경우 WHATWG방식은 에러가 발생하는데, 이전 방식은 에러가 발생하지 않음.
// const shortURL = new URL('/?num1=1&num2=2');  // error : Invalid URL
var parsedURL = url.parse('/?num1=1&num2=2');
console.log(parsedURL);