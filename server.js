var hostname  = "localhost"
var http = require('http')
var port = 3000
var server = http.createServer(function(req,res){
res.statusCode = 200
res.setHeader("Conten-Type","text/plain")
res.end('hello NodeJS')

})

server.listen(port,hostname,function(){
	console.log("111") 
})
