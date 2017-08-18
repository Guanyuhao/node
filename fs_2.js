const fs = require('fs')
//新建目录文件
fs.mkdir('logs',(err,stats)=>{
    console.log('成功创建目录')
})