var url = require('url');
const querystring = require('querystring');

const urlString = 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string1&query=string2&query2=string3#hash'

var myURL = url.parse(urlString);

const query = querystring.parse(myURL.query);
console.log('querystring.parse(): ', query);
console.log('querystring.stringify(): ', querystring.stringify(query))  // 하나의 문자열로 합치기