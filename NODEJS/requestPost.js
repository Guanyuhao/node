var http = require('http')

var querystring = require('querystring')

var postData = querystring.stringify({
    'question[title]':'good',
    'question[content]':'<p>good<br/></p>',
    'question[courseId]':'222',
    'question[lessonId]':'1633',
    '_csrf_token':'11972abad02abf83c96a4c0481eb5e35bc17eba8'
})
//console.log(postData) success

var options = {
    hostname:'www.codingke.com',
    port:80,
    mentod:'POST',
    path:'/ajax/create/course/question',
    headers:{
        'Accept':'*/*',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Connection':'keep-alive',
        'Content-Length':postData.length,
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':'PHPSESSID=bmdie70mscs9i9loupbf8rbv53; Hm_lvt_9f92046de4640f3c08cf26535ffdd93c=1486206350; Hm_lpvt_9f92046de4640f3c08cf26535ffdd93c=1486206554; CNZZDATA1256018185=405575213-1486205508-null%7C1486204225',
        'Host':'www.codingke.com',
        'Origin':'http://www.codingke.com',
        'Referer':'http://www.codingke.com/v/222-course-222-course',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
        'X-CSRF-Token':'11972abad02abf83c96a4c0481eb5e35bc17eba8',
        'X-Requested-With':'XMLHttpRequest'
    }
}

var request = http.request(options,function(res){
    console.log('Status'+res.statusCode)
    console.log('headers:'+JSON.stringify(res.header))
    res.on('data',function(chunk){
        console.log(chunk.toString())
    })
    res.on('end',function(){
        console.log('技术问答成功')     
    })
})

request.on('error',function(err){
    console.log(err)
})

request.write(postData)

request.end()
