async function f() {
    return 1;
}

async function f1() {
    console.log('no return value');
}

var result = f();       // 返回1个Promise对象，PromiseStatus是"resolved"，PromiseValue是1
console.log(result);    // Promise { 1 }

var result1 = f1();     // 返回1个Promise对象，PromiseStatus是"resolved"，PromiseValue是undefined
console.log(result1);   // Promise { undefined }