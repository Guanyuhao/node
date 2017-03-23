var mongodb = require('mongodb')
//连接数据库  记得 npm  创建数据库服务连接
var server = new mongodb.Server('localhost',27017,{auto_reconnect:true})
// 创建数据库的链接
var db = new mongodb.Db('guan',server,{safe:true})
//数据库链接测试
db.open(function(err,db){
    if( err ){
        console.log(err)
    }else{
        console.log('connect success!')
        db.collection('douban',{safe:true},function(err,conn){
            if(err){
                console.log(err)
            }else{
                //语句
                conn.find({year:{$lt:"1990"},genres:{$in:["动画"]}},{title:1,year:1,_id:0,genres:1}).toArray(function(err,res){
                    console.log(res)
                })
            }
        })
    }
})