const array = [
    {
        name: 'jack',
        age: 13
    },
    {
        name: 'lucy',
        age: 23
    }
];
const one = array.map((item, index) => {
    item.name = `hello ${item.name}`;
    item.age = item.age + 1;
    return item;
});
console.log(one);

var persons = [
    {name:'Anne', age: 23, gender:'female', activityType: 3},
    {name:'Leila', age: 16, gender:'female', activityType: 2},
    {name:'Jay', age: 19, gender:'male', activityType: 4},
    {name:'Mark', age: 40, gender:'male', activityType: 2}
];
console.log(persons);

// 过滤数组
var result = persons.filter(item => item.activityType == 1);
console.log(result);


// filter 函数
// filter<S extends T>(callbackfn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
// 是一个过滤函数，返回符合条件的元素的数组
// filter在循环的时候判断一下是true还是false，是true时才会返回这个元素
// filter接收的回调函数，可以有多个参数，通常仅使用第一个参数，表示array的某个元素。
// 回调函数还可以接收另外两个参数，表示元素的位置和数组本身
var arr = ['A', 'B', 'C'];
var r = arr.filter(function (element, index, self) {
    // console.log(element);
    // console.log(index);
    // console.log(self);
    // return false;      // 返回false或不返回值时，不会把element添加到返回的数组中
    return true;    // 返回true时，才会把element添加到返回的数组中
});
// console.log(r);

let foods = [
    {a:'苹果',b:'桃子',c:'吃',url:''},
    {a:'香蕉',b:'面包',c:'不吃',url:'http://wwww.w'},
    {a:'香蕉',b:'苹果',c:'吃',url:undefined},
    {a:'苹果',b:'菠萝',c:'不吃',url:'a'}
];
// console.log(foods.filter(element => element.a === '苹果'));
console.log(foods.filter(element => element.url));    // 当url有值是表示返回true，当url为空字符串或undefined时，表示返回false