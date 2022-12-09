// !作用在变量上，可用于判空，得到一个布尔值
// 作用在null, undefined, ''上，得到true
// 作用在普通变量上，得到false

console.log(!null);       // true
console.log(!undefined);  // true
console.log(!'');         // true

console.log(!100);    // false
console.log(!'abc');  // false

// !! ，在 ! 的基础上，再作取反
// 保证a是有实际含义的变量才执行方法

var a;
if (a != null && typeof(a) != undefined && a != '') {
    //a有内容才执行的代码  
}

// 替换为

if (!!a) {
    //a有内容才执行的代码...  
}
