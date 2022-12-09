// class
// https://github.com/lukehoban/es6features#classes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// https://www.w3schools.com/js/js_class_intro.asp

// 类中语法必须使用 strict mode 书写

// 定义类有两种方法：1. class declare, 2. class expression
// class declare
// 类声明必须在类引用前，否则报：ReferenceError
// js类不是对象，是对象的模板
class Rectangle {
    // 特殊函数，创建和初始化实例对象
    // 只能有一个构造函数
    // 可以使用 super 关键字调用父类的构造函数
    // 如果不添加构造函数，js会创建一个默认的
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    method1() {
        console.log('method1 called');
    }
}

let small = new Rectangle(3, 4)
console.log(small)  // Rectangle { width: 3, height: 4 }
small.method1()
