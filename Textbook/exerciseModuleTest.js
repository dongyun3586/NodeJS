const getArea = require('./exerciseModule')

let w = 30, h = 40;
console.log(`너비: ${w}, 높이: ${h}`)
console.log(`사각형의 넓이: ${getArea.rectangleAgea(w, h)}`)
console.log(`삼각형의 넓이: ${getArea.triangleArea(w, h)}`)