// 一个模块，既能导出多个普通成员，如变量、函数，又能同时导出default
// 普通成员可以导出多个，default 只能导出一个

export const season = 'winter';

export function jump() {
    console.log('do jump');
}

function eat(food) {
    console.log('eat', food);
}

const food = 'rice';

// 成员被 export 导出后，还可被 export default 再次导出
export default {
    eat,
    food,
    season,
    jump
}
