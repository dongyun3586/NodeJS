var fs = require('fs');
var path = require('path');

var filesPath = path.join(__dirname, 'Chapter03');

fs.readdir(filesPath, function(err, files){
    console.log(files);
    files.forEach(function(value){
        fs.stat(path.join(filesPath, value), function(err, stats){
            if(err){
                console.log(err.message)
            }else{
                if(stats.isFile())
                    console.log(value);
            }
        })
    })
})