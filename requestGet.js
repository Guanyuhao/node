var https = require('https')

var options = {
    hostname:'api.douban.com',
    port: 443,//https的端口号为 443 http 为80
    method:'GET',
    path:'/v2/movie/top250'
}

var responseData = ''

var request = https.request(options,function(response){
    //console.log(response.statusCode)
   // console.log(response.headers)
   response.on("data",function(chunk){
        responseData += chunk
   })

   response.on('end',function(){
       console.log(responseData)
   })
  
})

request.on('error',function(err){
    console.log(err)

})
request.end()