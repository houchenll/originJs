// 解构赋值语法是一种 Javascript 表达式。
// 通过解构赋值, 可以将属性/值从对象/数组中取出,赋值给其他变量。

var a, b, rest;
[a, b] = [10, 20];
// console.log(a);
// console.log(b);

[a, b, ...rest] = [10, 20, 30, 40, 50];
// console.log(a);
// console.log(b);
// console.log(rest);    // [ 30, 40, 50 ]

({a, b} = {a: 10, b: 20});
// console.log(a);
// console.log(b);

({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a);
console.log(b);
console.log(rest);    // { c: 30, d: 40 }
