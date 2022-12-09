
new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve()
    }, 1000)

}).then(() => {
    console.log('Hello 1')
    console.log(this)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
    
}).then(() => {
    console.log('Hello 2')
    console.log(this)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}).then(() => {
    console.log('Hello 3')
    console.log(this)
})
