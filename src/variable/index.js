// 数组解构
const names = ['one', 'two', 'three', 'four']
const [name1, name2, name3] = names
console.log(name1)    // one
console.log(name2)    // two
console.log(name3)    // three


// 对象解构
const obj = {
    name: 'jack',
    age: 23,
    height: 183
}
const {name, age} = obj
console.log(name)    // jack
console.log(age)     // 23