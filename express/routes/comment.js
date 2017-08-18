var express = require('express')
var router = express.Router()
var async = require('async')
var multiparty = require('multiparty')
var fs = require('fs')

var MongoClient = require('mongodb').MongoClient
var DB_CONN_STR = "mongodb://localhost:27017/guan"

router.post('/submit',function(req,res,next){
    var title = req.body['title']
    var content = req.body['content']

var insertData =  function(db,callback){
    var comment = db.collection('comment')
   
    var ids = db.collection('ids')

    // var data = {title:title,content:content}
    // conn.insert(data,function(err,result){
      
    //     callback(result)
    // })
    //desc 给_id排序
    async.waterfall([
        function(callback){
            ids.findAndModify(
                {name:'comment'},
                [['_id','desc']],
                {$inc:{id:1}},
                function(err,results){
                    console.log(results+""+err)
                    callback(null,results)
                }
            )
        },
        function(results,callback){
            console.log(results)
            var data ={title:title,content:content,uid:results.value.id}
            comment.insert(data,function(err,results){
                callback(null,results)
            })
        }
    ],function(err,results){
        callback(results)
    })
}

    MongoClient.connect(DB_CONN_STR,function(err,db){
        if(err){
            console.log(err)
        }else{
            insertData(db,function(result){
               // console.log(result)
               res.redirect('./list')
            })
            
        }
    })
})

router.get('/list',function(req,res,next){
    // var findData = function(db,callback){
    //     var conn = db.collection('comment')
    //     conn.find({}).toArray(function(err,results){
    //         callback(results)
    //     })
    // }
    //构建分页信息
    //获取post req.boday[]  get req.query[]
    var pageNo = Number(req.query['pageNo'])||1   
    //一页显示多少条

    var pageSize = 3
    var count = 0
    var totalPage = 0
    

    var findData = function(db,callback){
        var conn = db.collection('comment')
        //理解好 串行 并行parallel
        async.series([
            function(callback){
                conn.find({}).toArray(function(err,results){
                    if(err){
                        console(err)
                    }else{
                        totalPage = Math.ceil(results.length/pageSize)
                        count = results.length
                        pageNo = pageNo > totalPage? totalPage:pageNo
                        pageNo = pageNo < 1? 1:pageNo
                        //容错 有人更改地址连的地址
                        callback(null,"")
                    }
                })
            },
            function(callback){
                conn.find({}).sort({_id:-1}).skip((pageNo-1)*pageSize).limit(pageSize).toArray(function(err,results){
                    if(err){
                        console.log(err)
                    }else{
                        callback(null,results)
                    }
                })
            }
        ],function(err,results){
            callback(results[1])
        })
    }

    MongoClient.connect(DB_CONN_STR,function(err,db){
        if(err){
            console.log(err)
        }else{
            findData(db,function(results){
                //console.log(results)
                res.render('list',{
                    list:results,
                    pageNo:pageNo,
                    totalPage:totalPage,
                    count:count
                })
            })
        }

    })
    
})
router.post('/uploadImg',function(req,res){
    var form = new multiparty.Form()
    //设置编码
    form.encoding = 'utf-8'
    //设置文件大小限制
    form.maxFilesSize =2*1024*1024
    //设置临时文件的存储路径 需要自己创建
    form.uploadDir = './uploadtemp'
    //文件上传
    form.parse(req,function(err,fields,files){
    //需要自己创建
        var uploadUrl = "/images/upload/"
        //会自己创建的inpt name 是 filedata
        file = files['filedata']
        //文件原名
        originalFilename = file[0].originalFilename
        tmpPath = file[0].path
        var timestamp = new Date().getTime()
        //毫秒
        uploadUrl += timestamp + originalFilename
        newPath = './public/'+uploadUrl

        var fileReadStream = fs.createReadStream(tmpPath)
        var fileWriteStream = fs.createWriteStream(newPath)
        fileReadStream.pipe(fileWriteStream)
        fileWriteStream.on('close',function(){
            fs.unlinkSync(tmpPath)
            res.send('{"err":"","msg":"'+uploadUrl+'"}')
        })
    })
})
router.get('/detail',function(req,res,next){
    var id = Number(req.query['id'])

    var findData = function(db,callback){
        var conn = db.collection('comment')
        conn.find({uid:id}).toArray(function(err,results){
            callback(results)
        })
    }

     MongoClient.connect(DB_CONN_STR,function(err,db){
        if(err){
            console.log(err)
        }else{
            findData(db,function(results){
              
                res.render('detail',{
                   res:results[0]
                })
            })
        }

    })
})
module.exports = router