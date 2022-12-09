const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://root:asdffdsa@115.159.121.209:27017/poem';

var promise = new Promise(function(resolve){
    MongoClient.connect(url, (err, mongodb) => {
        if (null == err) {
            console.log('connected successfully to mongo server');
            resolve(mongodb);
        } else {
            console.log('connect fail to mongo server');
        }
    });
});

promise.then(function(db) {
    console.log('1 get db from previous')

    db.collection('menu').find({'book_id': 110102}, {_id:1, name:1}).sort({_id:1}).toArray((err, docs) => {
        assert.equal(err, null)
        return docs
    })
})
.then(function(docs) {
    console.log('2 get docs from previous')

    // 遍历目录列表
    for (var i = 0; i < docs.length; i++) {
        var id = docs[i]._id
        
    }
})
