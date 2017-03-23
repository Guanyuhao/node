const http = require('http')
const url = require('url')
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    if(req.url !=='/favicon.ico'){
        var pathname = url.parse(req.url).pathname.replace(/\//,"")
        switch(pathname){
            case 'login':
                res.write('login')
            break;
            case 'register':
                res.write('register')
            break;
        }
        res.end()
    }
}).listen(8000)

console.log('servre is running at localhost:8000')