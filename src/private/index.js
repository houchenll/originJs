
/*function add(num1, num2) {
	var sum = num1 + num2;
	return sum;
}*/

// 特权方法，有权访问私有变量和私有函数的公有方法。

// 第一种特权方法，在构造函数中定义特权方法。
// 利用私有和特权成员，可以隐藏那些不应该被直接修改的数据。
// 在构造函数中定义特权方法，有一个缺点，就是针对每一个实例，都会创建同样一组新方法。
/*function MyObject() {
	// 私有变量和私有函数
	var privateVariable = 10;

	function privateFunction() {
		return false;
	}

	// 特权方法
	this.publicMethod = function() {
		privateVariable++;
		return privateFunction();
	}
}*/

// 第二种特权方法，使用静态私有变量。
// 在私有作用域中定义私有变量或函数。
// 这种模式下，私有变量和函数由实例共享。
/*(function() {
	// 私有变量和私有函数
	var privateVariable = 10;

	function privateFunction() {
		return false;
	}

	// 构造函数，初始化一个未经声明的变量，总会创建一个全局变量。
	// 这样，MyObject就成了全局变量，可以在私有作用域之外被访问到。
	// 
	MyObject = function() {
	};

	// 公有/特权方法
	MyObject.prototype.publicMethod = function() {
		privateVariable++;
		return privateFunction();
	};
})();*/
/*(function() {
	// 静态的，由所有实例共享的属性。
	var name = '';

	Person = function(value) {
		name = value;
	};

	Person.prototype.getName = function() {
		return name;
	};

	Person.prototype.setName = function(value) {
		name = value;
	};
})();

var p1 = new Person('Nicholas');
console.log(p1.getName());    // Nicholas
p1.setName('Grge');
console.log(p1.getName());    // Greg

var p2 = new Person('Michael');
console.log(p1.getName());    // Michael
console.log(p2.getName());    // Michael*/


// 模块模式，为单例创建私有变量和特权方法。
var singleton = function() {
	// 私有变量和私有函数
	var privateVariable = 10;

	function privateFunction() {
		return false;
	}

	// 特权/公有方法和属性
	return {
		publicProterty: true,
		publicMethod: function() {
			privateVariable++;
			return privateFunction();
		}
	};
}();