const axios = require('axios');

// 用法1，默认get方式
// axios({
//     url: 'http://123.207.32.32:8000/home/multidata'
// }).then(response => {
//     console.log(response);
// });

// 用法2，指定为get方式
// axios({
//     url: 'http://123.207.32.32:8000/home/multidata',
//     method: 'get'
// }).then(response => {
//     console.log(response);
// });

// 用法3，使用get或post方法
axios.get('http://123.207.32.32:8000/home2/multidata')
    .then(response => console.log(response))   // 成功时执行
    .catch(err => console.log(err))            // 失败时执行
    .then(() => console.log('final then'));    // 总是会执行
