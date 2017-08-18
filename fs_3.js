const fs = require('fs')
//写文件

fs.writeFile('logs/hello.log','您好~\n',(error)=>{
    if(error){
        console.log(error)
    } else{
        console.log('文件创建成功')
    }
})

fs.appendFile('logs/hello.log','hello~\n',(error)=>{
    if(error){
        console.log(error)
    } else{
        console.log('成功追加')
    }
})