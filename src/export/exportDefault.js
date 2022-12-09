// 1. export default
// 通常有以下两种 module，第二种是推荐的
// 1. 模块是一个库，里面打包了很多成员
// 2. 模块只声明了一个实体，如一个类

// export default 的内容，如果是单个成员，直接跟在 export default 后即可
// 如果是多个成员，放在 export default {} 中
export default class Person {
    constructor(name) {
        this.name = name;
    }
}
