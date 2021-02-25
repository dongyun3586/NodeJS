const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

var db; 

MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db = client.db(dbName);
    db.myCol = db.collection('myCol');
});

// DB에서 도큐먼트들을 가져와, 콜백함수의 인자로 넘겨 실행한다. 
exports.findDocs = function(obj){
    db.myCol.find(obj.query).toArray(function(err, docs){
        if(err){
            console.log(err.message);
        }else{
            obj.callback(docs);
        }
    });
}

// 새로운 도큐먼트를 DB에 추가한다.
exports.insertOne = function(body){
    db.myCol.insertOne({title: body.title, description: body.description}, function(err, result){
        if(err){
            console.log(err.message);
        }else{
            console.log(result.ops);
        }
    });
}

// obj.filterQuery로 특정 도큐먼트를 선택하여, 새로운 title과 description 데이터로 수정 
exports.updateOne = function(obj){
    db.myCol.updateOne(obj.filterQuery, {$set: obj.updateQuery}, function(err, result){
        if(err){
            console.log(err.message);
        }else{
            console.log('data updated');
        }
    });
}

// filterQuery로 특정 도큐먼트를 선택하여 삭제
exports.deleteOne = function(filterQuery){
    db.myCol.deleteOne(filterQuery, function(err, result){
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log(`Removed the document with the field a equal to ${filterQuery.title}`);
    });
}