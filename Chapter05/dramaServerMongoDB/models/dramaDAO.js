const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
const url = 'mongodb://localhost:27017';  // Connection URL
const dbName = 'dramaListDB';  // Database Name

var db;

MongoClient.connect(url, { useNewUrlParser: true }, function(err, client){
    db = client.db(dbName);
    db.dramaCol = db.collection('myCol');
});

exports.dramaList = function(options){
    db.dramaCol.find(options.query).toArray(function(err, docs){
        if(err){
            console.log(err.message);
        }else{
            options.callback(docs);
        }
    });
}

exports.insertDrama = function(options){
    db.dramaCol.insertOne({title: options.title, actor: options.actor}, function(err, result){
        if(err){
            console.log(err.message);
        }else{
            console.log('data inserted');
        }
    });
}