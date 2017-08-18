//文件的读取流
var fs = require('fs')

var fileReadStream = fs.createReadStream('data.json')

// var count =  0

// fileReadStream.on('data',function(chunk){
//     console.log(`${count++}接受到的${chunk.length}`)
// })

// fileReadStream.on('end',function(){
//     console.log('end')
// })

// fileReadStream.on('error',(err)=>{
//     console.log(err)
// })

//写文件流
var zlib = require('zlib')
var fileWriteStream = fs.createWriteStream('data.json.gz')

fileWriteStream.on('pipe',(source)=>{
    console.log(source)
})
fileReadStream
    .pipe(zlib.createGzip())
    .pipe(fileWriteStream)