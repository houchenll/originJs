
function Person() {}

Person.prototype = {
	name: 'Nicholas',
	age: 27,
	friends: ['Shelby', 'Court'],
	setAge: function(value) {
		// this.age = value;    // 不能这样实现，这样是在实例对象上新添加一个age属性，而不是修改原型对象上的属性。
		// age = value;    // 无效方法。
		Person.prototype.age = value;
	}
};

var p1 = new Person();
var p2 = new Person();

// 构造函数的不同实例共享原型对象。

console.log(p1.name, p1.hasOwnProperty('name'));    // Nicholas, false
p1.name = 'Mical';    // 修改的不是原型中的属性，而是在实例上新添加了一个私有属性。
console.log(p1.name, p1.hasOwnProperty('name'));    // Mical, true
console.log(p2.name, p2.hasOwnProperty('name'));    // Nicholas, false
// 这个例子表明，构造函数的不同实例，继承的原型数据中的基本类型数据，
// 每个实例都有单独的一份，互不影响。

console.log(p1.friends);    // [ 'Shelby', 'Court' ]
p1.friends.push('lucy');
console.log(p1.friends);    // [ 'Shelby', 'Court', 'lucy' ]
console.log(p2.friends);    // [ 'Shelby', 'Court', 'lucy' ]
// 这个例子表明，构造函数的不同实例，继承的原型数据中的引用类型数据，
// 所有实例引用的是同一份数据，引发一次，影响其它。

// ？？？为什么同是原型中数据，基本数据每个实例单独有一份，而引用类型数据所有实例共享一份。
// 因为p1.name是在实例对象上新添加了一个私有属性，而不是修改的原型属性，原型上的name属性仍然存在，且没有变化。
// p1.friends.push()是在原型属性上做操作，修改了原型属性，所有其它实例对象引用的原型对象也受到了影响。
// 如果希望修改原型中的基本类型属性，需要提供方法，或找到实例对象的原型，使用原型引用原型的属性进行修改。
p1.setAge(18);
console.log('p1 age ' + p1.age);    // 18
console.log('p2 age ' + p2.age);    // 18
p1.__proto__.age = 13;
console.log('p1 age ' + p1.age);    // 13
console.log('p2 age ' + p2.age);    // 13
