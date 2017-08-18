const fs = require('fs')
//读取文件
fs.stat('hello.js',(err,stats)=>{
    if (err) {
        console.log(err)
    } else {
        console.log(stats)
        console.log(`文件:${stats.isFile()}`)
        console.log(`目录:${stats.isDirectory()}`)       
    }
})