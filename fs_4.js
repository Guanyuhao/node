//读取文件
const fs = require('fs')

fs.readFile('logs/hello.log',(err,data)=>{
    if (err) {
        console.log(err)
    } else {
        console.log(data.toString())
    }
})
//读取文件名
fs.readdir('logs',(err,files)=>{
    console.log(files)
    console.log(files[0])
})
//文件重命名
fs.rename('logs/hello.log','logs/greeting.log',(err)=>{
    console.log('文件重命名')
})
//文件删除
fs.readdirSync('logs').map((file)=>{
    fs.unlink(`logs/${file}`,(error)=>{
        if(error){
            console.log(error)
        }else{
            console.log('success')
        }
    })
})
fs.rmdir('logs',(err)=>{
    if(err){
        //因为目录不为空需要先删除文件
        console.log(err)
    } else{
        console.log('Deleted')
    }
})