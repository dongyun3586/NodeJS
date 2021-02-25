var util = require('util');

var name = 'World';
var msg = util.format('Hello %s', name);

console.log(msg);