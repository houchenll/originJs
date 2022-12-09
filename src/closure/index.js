
/*var name = 'The Window';

var obj = {
	name: 'My Object',
	getNameFunc: function() {
		return function() {
			// which object is this mean ?
			return this.name;
		};
	}
};

console.log(obj.getNameFunc()());    // undefined*/



/*var name = 'The Window';

var obj = {
	name: 'My Object',
	getNameFunc: function() {
		// this means obj.
		var that = this;
		return function() {
			return that.name;
		};
	}
};

console.log(obj.getNameFunc()());    // My Object*/



/*function makeAdder(x) {
	return function(y) {
		return x + y;
	};
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));    // 7
console.log(add10(2));   // 12*/



var Counter = (function() {
	var privateCounter = 0;
	function changeBy(val) {
		privateCounter += val;
	}
	return {
		increment: function() {
			changeBy(1);
		},
		decrement: function() {
			changeBy(-1);
		},
		value: function() {
			return privateCounter;
		}
	};
})();

console.log(Counter.value());        // 0
Counter.increment();    // 1
Counter.increment();    // 2
console.log(Counter.value());        // 2
Counter.decrement();    // 1
console.log(Counter.value());        // 1
