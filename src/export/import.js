// 1. 把需要导入的成员明确声明在 {} 中，推荐方式
import {sayHi, sayBye, morning} from './export.js';
sayHi('Jack');
sayBye('Jack');
morning('Lily');


// 2. 当有很多成员需要导入时，可以导入所有成员在一个对象中，并为对象指定别名，然后使用对象别名访问这些成员，不推荐
import * as say from './export.js';
say.sayHello('Lucy');
say.sayBye('Lucy');


// 3. 推荐使用方法1，不推荐使用方法2，因为：
// 编译工具把所有文件打包在一起，移除未使用项，加速加载。使用方法1，可以在编译时只添加使用到的成员到最终文件
// 调用名称更短： sayHi() vs say.SayHi()
// 更易读，更易重构


// 4. 可以为导入成员起别名
import { sayHello as hello } from './export.js';
hello('David');


// 5. import default 成员时，不用加 {}，直接使用 export 时的名称
import Person from './exportDefault.js'
console.log(new Person('lii'));

// 6. 导入导出了多个成员且含有default成员的模块时
// test 对应 export default 导出的内容，是单个成员，可能是对象，也可能是变量、函数、类，test名字任取
// {}内对应 export 导出的多个成员，名称需与export时的名称对应
// 如果只导入导出的 default 成员，{}可省略
// 如果只导入普通导出的成员，{}外成员可省略
import test, { season, jump } from './exportMix.js'
test.eat(test.food)
console.log('default jump')
test.jump()
console.log('export jump')
jump()
console.log('season', season)
