// 1. 任何声明都可以 export
// 一个文件可以 export 多个成员，成员可以是声明的变量、常量、函数、类
export let months = ['Jan', 'Feb'];
export const STANDARD_YEAR = 2015;
// 1.1 export class and function 时，尾部不添加 ;
export class User {
    constructor(name) {
        this.name = name;
    }
}
export function sayHi(user) {
    console.log(`hi ${user}`);
}


// 2. export 和声明可以分开，但此时成员需要放在 {} 中
function sayHello(user) {
    console.log(`hello ${user}`);
}
function sayBye(user) {
    console.log(`bye ${user}`);
}
export {sayHello, sayBye};


// 3. export 成员时可以起别名
function sayMorning(user) {
    console.log(`Morning ${user}`);
}
export {sayMorning as morning};
