// 1. javascript 객체
function Car(name, color){
    this.name = name;
    this.color = color;
}
console.log(typeof Car)

var car1 = new Car("현대", "노랑");
console.log(typeof car1)
console.log(car1.name, car1.color);

var car2 = new Car("기아", "빵강");
console.log(car2.name, car2.color)

// javascrpit 객체는 prototype 기반이다.
Car.prototype.desc = function(){
    console.log(`${this.name}차, ${this.color}색`);
}
car1.desc();
car2.desc();

// 배열 객체 Array에 새로운 함수 print() 생성하기
var arr = [1,2,3,4,5]
console.log(typeof arr)
Array.prototype.print = function(){
    for(var i=0; i<this.length; i++)
        console.log(i);
}

arr.print()