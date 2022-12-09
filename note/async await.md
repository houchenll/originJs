`async/await`是`js`中一种异步解决方案；  

`async`用于申明一个`function`是异步的，`await`用于等待一个异步方法执行完成；  

`async`的用法就是在函数开头加一个关键字`async`，作用是让函数返回一个Promise对象。promise对象有两个属性，PromiseStatus和PromiseValue，如果正常返回，PromiseStatus值是"resolve"，如果执行异常，值为"reject"；当函数有返回值时，PromiseValue值为返回值，当函数无返回值时，PromiseValue值为undefined  

```
[return_value] = await expression;
```
