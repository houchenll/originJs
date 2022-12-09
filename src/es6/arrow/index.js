
// ES5
const x = function (x, y) {
    return x * y
};

// ES6
// 箭头函数功能：省略 function 关键字，用 => 连接参数和函数体，参数外括号、花括号、return也可在有些条件下省略
// 推荐写法
const mul = (x, y) => {
    return x * y
}

// 当函数体只有一句表达式，且表达式返回一个值时，可省略函数体花括号和return
const y = (x, y) => x * y
// 当函数体只有一句语句时，可省略函数体花括号
const sayHello = name => console.log("hello " + name)
// 当函数体有多条语句时，不可省略函数体花括号和return
const doublePlus = (x, y) => {
    const a = x * 2
    const b = y * 2
    return a + b
}

// 当只有一个参数时，可省略 ()
const double = x => x * 2
// 当有多个参数或无参数时，必须用 () 代表参数
const hello = () => {
    return "Hello World"
}
// result params
const result = (a, b, ...r) => a + b + r
// 参数默认值
const defaultValue = (a = 10, b = 20, c) => a + b
// 解构，调用方需要传入数组，[10, 20] 是默认值
const add = ([a, b] = [10, 20]) => a + b
// 解构，调用方需传入对象，{ a: 10, b : 20 } 是默认值
const add2 = ({a, b} = { a: 10, b : 20 }) => a + b
const add3 = ({a, b}) => a + b

// 当函数体只有一个对象字面量表达式，且省略函数体和 return 时，必须使用 () 包裹对象
const getBody = v => ({even: v, odd: v + 1})

// 当在函数体内返回对象时，不用使用 () 包裹对象
const getBody2 = v => {
    return {
        even: v,
        odd: v + 1
    }
}

const nums = [1, 2, 3, 4, 5]
// 函数体可是陈述语句，没有返回值
// 当需要的函数有多个参数时，箭头函数可只使用其中一部分，按顺序对应，参数名可任意自定义
nums.forEach(a => {
    if (a % 2 === 0)
        console.log(a)
})

// console.log(add3({a: 33, b: 22}))

// 普通函数中，this 表示调用函数的对象，是动态的
// arrow 函数中，this 始终表示创建函数的对象，即箭头函数的 owner，即和外围代码共用相同的 this

const obj = {  // does not create a scope
    i: 10,
    b: () => console.log(this.i, this),  // undefined {}
    c() {
        console.log(this.i, this)
    }
}
// obj.b()
// obj.c()

const obj1 = {
    count: 10,
    doSomethingLater() {
        setTimeout(function () {  // execute on the window scope
            this.count++  // this means window
            console.log(this.count, this)  // NaN, because count does not in window scope
        }, 300)
    }
}
const obj2 = {
    count: 10,
    doSomethingLater() {
        // this tradition function bind this to obj2 context
        setTimeout(() => {
            // Since the arrow function doesn't have its own binding and
            // setTimeout (as a function call) doesn't create a binding
            // itself, the "obj2" context of the traditional function will
            // be used within.
            this.count++
            console.log(this.count, this)  // 11
        }, 300)
    }
}
obj1.doSomethingLater()
obj2.doSomethingLater()


// more
// https://www.w3schools.com/js/js_arrow_function.asp
// https://github.com/lukehoban/es6features
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
