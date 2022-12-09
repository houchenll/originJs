
// method 1
// create an instance of Object, add field and method on it.
var person = new Object();
person.name = "Nicholas";
person.age = 29;
person.job = "Software Engineer";
person.sayName = function() {
    console.log(this.name);
};

// method 2
// create object instance by {}
var person_2 = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName: function() {
        console.log(this.name);
    }
};

// method 1 and method 2 was difficult when create multi object for one standard.
// so there is method 3 use factory.

// method 3
// create many object instance by factory method.
function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(this.name);
    }
    return o;
}
var person_3 = createPerson("Nicholas", 29, "Software Engineer");

// method 3的问题是，虽然解决了创建多个相似对象的问题，却没有解决对象识别的问题，即怎样知道一个对象的类型。
// 使用构造函数模式，既解决创建多个相似对象的问题，也能识别对象的类型。

// method 4
// 使用构造函数创建对象
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        console.log(this.name);
    };
}
var person_4 = new Person("Nicholas", 28, "Software Engineer");
// 构造函数的特点： 1. 没有显式创建对象； 2. 直接将属性和方法赋值给this对象； 3. 没有return语句。 4. 函数名首字母使用大写字母。
// 构造函数生成的实例，都有一个constructor属性，指向Person。
// 构造函数可以像普通函数一样调用，这样构造函数中的this就指向了全局对象window。
Person("Greg", 27, "Doctor");
window.sayName();
// 构造函数可以使用call()或apply()方法，在指定对象的作用域中调用Person函数，this就指向传入的对象。
var o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName();
