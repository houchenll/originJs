// undefined, null, '' equals false
// 正常有值字符串 equals true

var one = undefined
var two = null
var three = ''
var four = '1'

console.log('one')
console.log(!one)    // true
console.log(!!one)   // false

console.log('two')
console.log(!two)    // true
console.log(!!two)   // false

console.log('three')
console.log(!three)    // true
console.log(!!three)   // false

console.log('four')
console.log(!four)     // false
console.log(!!four)    // true
