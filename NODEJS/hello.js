const http = require('http')

http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    
    // 2次hello word 的问题 favicon.ico 百度
    //console.log(request.url)
if(request.url !='/favicon.ico'){
    console.log('hello word')
    response.write("<a>hello Node</a>")   
    response.end()
}
    
}).listen(3000)
console.log("2222")