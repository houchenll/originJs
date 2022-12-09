# js原型和继承

类的作用是基于一个模板创建对象，继承是继承一个模板并扩展或改写它，然后还是创建对象。所以归结起来，都是基于一个模板创建对象的问题，即都是基于一个接口（标准），创建对象的问题。  
而基于一个标准，创建对象，不一定必须用类的方法，也可以有很多其它方法。下面会介绍很多创建对象的方法，大部分方法都有一定的优势和缺点。实际应用中，针对业务场景，不一定必须用最完善的那个方法，因为最完善的方法通常比较麻烦，而是可以灵活选择最适合的方法，虽然这种方法在其它场景下可能有缺点。  

<!-- more -->

## 完整版
先介绍js继承的完整实现方式，然后再分步介绍怎么演化得到这个最终形态。  

```
// 完整版继承

function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'green', 'blue'];
}

// 原型上添加方法，为所有实例所共享，相当于java中的父类方法
// 可以访问原型属性、原型方法、实例属性、实例方法。不能访问私有属性和方法。
SuperType.prototype.sayName = function() {
    console.log(this.name);
}

// 原型上添加属性，为所有实例所共享，相当于java中的静态方法
// 可以被原型方法，实例方法，私有方法所访问
SuperType.prototype.country = 'CN';

// 静态方法。只能通过SuperType访问
SuperType.show = function() {
    console.log('show hello from SuperType');
};

// 静态属性和方法。只能通过SuperType访问
SuperType.season = 'summer';
SuperType.show = function() {
    console.log('this is static function');
}

// 公用数据，此前文件所有父和方法公用。不能在文件外部访问。
var name = 'hhh'

function SubType(name, age) {
    // 在添加实例属性之前，先调用超类的构造函数，避免子类型属性被覆盖
    SuperType.call(this, name);
    this.age = age;

    // 私有属性，各个对象的私有属性相互独立。只能被当前构造函数私有方法和实例方法所访问
    var sex = 'male';

    this.getSex = function() {
        return sex;
    };

    this.setSex = function(value) {
        sex = value;
    };

    // 私有方法，只能被当前构造函数内的私有方法或实例方法所访问，不能被对象访问
    var that = this;
    function talk() {
        console.log('I like talk');
        // 私有方法可以访问原型方法、实例方法、私有方法
        that.sayAge();
    }

    // 实例方法，也叫特权方法，因为它有访问私有成员的特权
    // 实例方法可以访问私有方法、实例方法、原型方法
    this.init = function() {
        talk();
    }

    // 尽量不要在原型方法，实例方法，私有方法之外定义方法
}

// 实现原型继承
function inheritPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
    console.log(this.age);
}
```

## 创建对象

### 0. 创建单个对象
使用对象字面量，或者Object构造函数，都可以创建单个对象。然后向对象上添加方法或属性。  

```js
// 使用Object构造函数或对象字面量创建对象
let person = new Object();
let person1 = {};

// 向对象上添加属性和方法
person1.name = 'jack';
person1.hello = function() {
    console.log(`Hello, I'm ${this.name}`);
}

// 使用对象字面量创建对象时，可以在创建时就添加属性和方法
let person2 = {
    name: '李雷',
    hello: function() {
        console.log(`你好，我是${this.name}`);
    }
};
```

### 1. 创建多个相似对象
如果想基于一个对象，创建多个相似的对象。类似的对象可能属性和方法有增减，属性值和方法内容有修改。可以复制基准对象，然后修改属性和方法。  
缺点：使用同一个接口创建很多对象，会产生大量的重复代码。  

```js
var jack = {
    name: 'jack',
    age: 18
};

var david = {
    name: 'david',
    age: 23
};
```

### 2. 工厂模式
创建一个函数，封装以特定接口创建对象的细节。  
好处：避免了重复代码。  
缺点：创建的对象都是普通对象，互相之间没有关系。很多时候我们想知道一个对象的类型，工厂模式无法解决这个问题。  

```js
function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(this.name);
    };
    return o;
}
```

### 3. 构造函数模式
除了使用原生构造函数外，也可以自定义构造函数。  

```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        console.log(this.name);
    };
}

var person1 = new Person("西门吹雪", 29, "Software Engineer");
var person2 = new Person("上官婉儿", 27, "Doctor");
```

构造函数模式与工厂模式的区别有：  

* 没有显式地创建对象；
* 直接将属性和方法赋给了this对象；
* 没有return语句；

要创建`Person`新实例，使用`new`操作符。以这种方式调用构造函数创建实例，实际上会经历以下步骤：  

1. 创建一个新对象；
2. 将构造函数的作用域赋值给新对象（因此this就指向了这个新对象）；
3. 执行构造函数中的代码（为这个新对象添加属性）；
4. 返回新对象；

> 注意：构造函数始终应该以一个大写字母开头，而非构造函数应该以一个小写字母开头。  

构造函数的实例都有一个constructor属性，指向Person，用来标识对象类型。  

```js
console.log(person1.constructor == Person);  // true
```

检测对象类型，更常用和方法是使用`instanceof`操作符。person1既是Person的实例，也是Object的实例(所有对象均继承自Object)。  

```js
console.log(person1 instanceof Object);  // true
console.log(person1 instanceof Person);  // true
```

好处：可以将构造函数的实例标识为一种特定的类型；这正是构造函数模式胜过工厂模式的地方。  

#### 构造函数作为普通函数
构造函数也是函数，不存在定义构造函数的特殊语法，与其它函数的唯一区别，就在于调用它们的方式不同。任何函数，只要通过new操作符调用，那它就可以作为构造函数，而任何函数，如果不通过new操作符调用，就是普通函数。  

```js
// 作为普通函数调用
Person("Greg", 27, "Doctor");  // 添加到global对象上（在浏览器中是window对象）
global.sayName();  // Greg

// 在另一个对象的作用域中调用
var o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName();  // Kristen
```

#### 构造函数的问题
使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。因此不同实例上的同名函数是不相等的。然而创建两个同样任务的实例没有必要，而且有this对象在，根本不用在执行代码前就把函数绑定到特定对象上，因此可以像下面这样，通过把函数定义转移到构造函数外部来解决这个问题。这样，不同实例就共享了在全局作用域中定义的同一个函数。  

```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}
function sayName() {
    console.log(this.name);
}
```
这样做的新问题是：在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域名不符实。而且，如果对象需要定义很多就去，就要定义很多个全局函数，于是这个自定义的引用类型就丝毫没有封装性可言。  
而这些问题，可以通过原型模式来解决。  

### 4. 原型模式

#### 什么是原型
每个函数都有一个prototype属性，指向一个对象，这个对象就是函数的原型对象。所有原型对象都会自动获得一个`constructor`属性，指向原型对象对应的函数。构造函数创建的实例都包含一个`__prototype__`属性，指向对应构造函数的原型对象，构造函数的所有实例共享原型对象中的属性和方法。  

因此，可以不必在构造函数中定义对象实例的信息，而是将这些信息直接添加到原型对象上。  

```js
function Person() {
}

Person.prototype.name = "西门吹雪";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
    console.log(this.name);
};

var person1 = new Person();
```

#### 构造函数、实例、原型之间的关系
![img](./image1.png)  

使用`isPrototypeOf()`方法，可以确定一个对象是不是另一个对象的原型对象。使用`Object.getPrototypeOf()`可以获取一个对象的原型对象。

```js
console.log(Person.prototype.isPrototypeOf(person1));  // true
console.log(Object.getPrototypeOf(person1) == Person.prototype);  // true
```

#### 属性搜索过程
每当代码读取某个对象的某个属性时，都会执行一次搜索。搜索首先从对象实例本身开始。如果在实例上找到了具有给定名字的属性，就返回该属性的值；如果没有找到，则继续搜索对象的原型对象，在原型对象中查找给定名字的属性。如果在原型对象中找到了这个属性，就返回该属性的值。这就是多个对象实例共享原型所保存的属性和方法的基本原理。  

**覆盖原型属性与去覆盖：**  
当为对象实例一个属性时，这个属性会屏蔽原型对象中的同名属性。添加这个属性只会阻止我们访问原型中的属性，但不会修改那个属性。  
为对象实例设置同名属性后，如果想再次访问原型中的属性，需要使用`delete`操作符，完全删除实例属性，才可以再次重新访问原型中的属性。  

```js
delete person1.name;
```

#### 判断属性位置
使用`hasOwnProperty()`方法可以检测一个属性是存在于实例中，还是存在于原型中。这个方法只在给定属性存在于对象实例中时，才会返回true。  
单独使用`in`操作符时，in操作符会在通过对象能够访问给定属性时返回true，无论该属性存在于实例中还是原型中。  
同时使用`hasOwnProperty()`方法和`in`操作符，可以确实属性到底是存在于对象中，还是存在于原型中。  

#### 使用对象字面量定义原型对象
为每一个属性和方法都敲一遍 `Person.prototype`太麻烦。为减少不必要的输入，也为了在视觉上更好地封装原型的功能，推荐用一个包含所有属性和方法的对象字面量来重写整个原型对象：  

```js
function Person() {
}

Person.prototype = {
	constructor = Person,
    name: "西门吹雪",
    age: 29,
    job: "Software Engineer",
    friends: ["Shelby", "Court"]
    sayName: function() {
        console.log(this.name);
    }
};
```

使用对象字面量定义原型对象时，需要注意两点：  

1. 对象字面量的contructor默认是Object，需要手动修改为当前对应的函数名；  
2. 为函数指定原型对象必须在创建对象之前；  

#### 原型对象的问题

1. 省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值；  
2. 引用类型的属性，一个实例修改后，会影响其它实例；  

### 5. 组合使用构造函数模式和原型模式
创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。构造函数模式用于定义实例属性，而原型模式用于定义方法和共享属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。而且这种混成模式还支持向构造函数传递参数。  

```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["小张", "小王"];
}

Person.prototype = {
    constructor: Person,
    sayName: function() {
        console.log(this.name);
    }
}

var person1 = new Person("西门吹雪", 29, "Software Engineer");
```

### 6. 动态原型模式
5中实现，构造函数和原型定义是分开的，不利于代码封装。动态原型模式把所有信息都封装在构造函数中，在构造函数内初始化原型（仅在必要的情况下），又保持了同时使用构造函数和原型的优点。  
具体实现是通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型。  

```js
function Person(name, age, job) {
    // 属性
    this.name = name;
    this.age = age;
    this.job = job;

    // 方法
    if (typeof this.sayName != "function") {
        Person.prototype.sayName = function() {
            console.log(this.name);
        };
    }
}
```

> 注意：使用动态原型模式时，不能使用对象字面量重写原型对象。  

## 继承
面向对象语言中，继承有两种方式：接口继承和实现继承。接口继承只继承方法签名，而实现继承则继承实际的方法。函数没有签名，所以js中无法实现接口继承，只支持实现继承。其实现继承主要是依靠原型链实现的。  

### 1. 原型链

#### 什么是原型链
原型链是实现继承的主要方法，其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。  
具体实现是让原型对象等于另一个类型的实例，此时的原型对象会包含一个指向另一个原型的指针，相应的另一个原型中也包含一个指向另一个构造函数的指针。  
假如另一个原型又是另一个类型的实例，那么上述关系依然成立，层层递进，就构成了实例与原型的链条，即原型链。  

```js
function SuperType() {
    this.property = true;
}
SuperType.prototype.getSuperValue = function() {
    return this.property;
}

function SubType() {
    this.subproperty = false;
}
// 继承了 SuperType
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
// 添加新方法
SubType.prototype.getSubValue = function() {
    return this.subproperty;
}
// 重写超类型中的方法
SubType.prototype.getSuperValue = function() {
    return false;
}

var instance = new SubType();
```

原型链继承时，对象关系图
![img](./image2.png)

通过原型链实现继承的情况下，搜索过程沿着原型链向上进行。  

#### 确定原型和实例的关系
有两种方式可以确定原型和实例之间的关系。  
第一种是使用`instanceof`操作符，只要用这个操作符来测试实例与原型链中出现过的构造函数，结果就会返回true。  

```js
console.log(instance instanceof Object);  // true
console.log(instance instanceof SuperType);  // true
console.log(instance instanceof SubType);  // true
```

第二种方法是使用`isPrototypeOf()`方法。只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型，都会返回true。  

```js
console.log(Object.prototype.isPrototypeOf(instance));  // true
console.log(SuperType.prototype.isPrototypeOf(instance));  // true
console.log(SubType.prototype.isPrototypeOf(instance));  // true
```

> 注意：在通过原型链实现继承时，不能使用对象字面量创建原型属性和方法，因为这样做会重写原型链。  

#### 原型链的问题
1. 通过原型链实现继承时，原来的实例属性变成了原型属性，为所有实例所共享，如果包含引用类型值的数据，就会引起问题。  
2. 在创建子类型实例时，不能向超类型的构造函数传递参数。  

因此，很少单独使用原型链实现继承  

### 2. 借用构造函数
这种方法可以解决原型链处理引用类型值的问题。方法是，在子类型构造函数的内部调用超类型构造函数。  

```js
function SuperType(name) {
    this.colors = ['red', 'blue', 'green'];
    this.name = name;
}

function SubType() {
    SuperType.call(this, "西门吹雪");
    this.age = 29;
}

var instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors);  // [ 'red', 'blue', 'green', 'black' ]

var instance2 = new SubType();
console.log(instance2.colors);  // [ 'red', 'blue', 'green' ]
```

**问题：**  
仍然会出现构造函数模式的问题，方法都在构造函数中定义，函数没有复用。而且，在超类型原型中定义的方法，对子类型也是不可见的。所以这种模式也不会单独使用。  

### 3. 组合继承
将原型链和借用构造函数的技术组合到一起，使用原型链实现对原型属性和方法的继承，通过借用构造函数实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性。  

```js
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function() {
    console.log(this.name);
}

function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;

// 追加原型属性
SubType.prototype.sayAge = function() {
    console.log(this.age);
};
```

### 4. 原型式继承
当拥有一个对象，想创建一个类似的对象时，如果不想劳师动众地创建构造函数，可以使用原型式继承，创建已有对象的一个副本，再在副本上修改或添加属性。注意：所有的副本和原对象共享引用类型值。  

```
// 生成一个以o为原型的空对象
// 可用Object.create()代替
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

var person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van']
};

// var anotherPerson = object(person);
var anotherPerson = Object.create(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

// var yetAnotherPerson = object(person);
var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('Barbie');

console.log(person.friends);  // [ 'Shelby', 'Court', 'Van', 'Rob', 'Barbie' ]
```

### 5. 寄生式继承
如果有一个已知对象，想得到一个它的增强对象，可以使用这种模式。  
方法是创建一个函数，在内部先得到已知对象的一个副本，然后为副本添加属性和方法，最后返回增强后的对象。  
问题：与构造函数相同，不能复用方法。  

```js
function createAnother(original) {
    var clone = Object.create(original);  // 通过调用函数创建一个新对象
    clone.sayHi = function() {     // 以某种方式来增强这个对象
        console.log('hi');
    };
    return clone;                  // 返回这个对象
}

var person = {
    name: '西门吹雪',
    friends: ['Shelby', 'Court', 'Ven']
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi();
```

### 6. 寄生组合式继承
组合继承最大的问题是无论什么情况下，都会调用两次超类型的构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。虽然第二次调用超类型构造函数会在子类型实例上添加超类型的属性，屏蔽原型中的属性，但原型中的超类型的实例属性是不必要的。  
使用寄生组合式继承，可以解决这个问题。即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。这样，不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。  

```
function inheritPrototype(subType, superType) {
    var prototype = Object.clone(superType.prototype);  // 创建对象
    prototype.constructor = subType;                    // 增强对象
    subType.prototype = prototype;                      // 指定对象
}

function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function() {
    console.log(this.name);
}

function SubType(name, age) {
    SuperType.call(this, name);

    this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
    console.log(this.age);
};
```
这种方式的高效体现在它只调用一次超类型构造函数，从而避免了在子类型原型上创建不必要的、多作的属性。  

## ES6 class 继承
class继承是ES6实现的语法糖，使JS可以用面向对象的语法实现类和继承，底层实现是基于原型链继承。  

extend 关键字实际上是在Rabbit.prototype添加[[Prototype]]，引用到Animal.prototype，实现方法的原型链继承。  

constructor等于原来实现中的构造函数。extend和类内方法等于原来实现中的原型链继承。  

getter和setter用于拦截对属性的访问，做一些自定义操作。  

静态属性和方法不会被实例继承，只能用类名访问。  

```js
class Animal {
    constructor(name, speed = 0) {
        this.speed = speed;
        this.name = name;
    }

    run(speed = 0) {
        this.speed += speed;
        console.log(`${this.name} runs with speed ${this.speed}`);
    }

    stop() {
        this.speed = 0;
        console.log(`${this.name} stopped.`);
    }

    // 静态方法，不能被实例继承，只能通过类名访问
    static compare(animalA, animalB) {
        return animalA.speed - animalB.speed;
    }

    // getter 和 setter 用于拦截对属性的访问，可以在此添加一些自定义的代码
    get x() {
        console.log('getter');
    }

    set x(val) {
        console.log(`setter: ${val}`)
    }
}

// 静态属性
Animal.foot = 4;

class Rabbit extends Animal {
    constructor(name, speed, age) {
        super(name, speed);    // 调用超类构造函数
        this.age = age;
    }

    hide() {
        console.log(`${this.name} with age ${this.age} hide!`);
    }

    // 复写stop()方法
    stop() {
        super.stop();    // 调用超类方法
        this.hide();
    }
}

let rabbit = new Rabbit("White Rabbit", 3, 5);
rabbit.run(3);  // White Rabbit runs with speed 3
rabbit.stop();
```