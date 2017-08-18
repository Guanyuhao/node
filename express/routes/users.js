var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var DB_CONN_STR = "mongodb://localhost:27017/guan"

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.all('/registor',function(req,res){
 // res.send('registor')
 //bodyParse 存的
 //console.log(req.body['username'])
 var username = req.body['username']
 var password = req.body['password']
 
 var insertData = function(db,callback){
   //连接 collection
   var conn = db.collection('user')
   //获得前端提交数据并格式化
   var data = {
     username:username,
     password:password
   }
   //出入数据
   conn.insert(data,function(err,result){
     if(err){
       console.log(err)
     }else{
       callback(result)
     }
   })
 }

 //数据库连接
 MongoClient.connect(DB_CONN_STR,function(err,db){
   if(err){
    console.log(err)
   }else{
     // console.log("数据库连接成功")
      insertData(db,function(result){
       // console.log(result)
       // res.send('注册成功')
       res.redirect('/login')
        db.close()
      })
   }
 })
})

router.all('/login',function(req,res){
 var username = req.body['username']
 var password = req.body['password']
 
var findData = function(db,callback){
  var conn = db.collection('user')
  var data ={username:username,password:password}
  conn.find(data).toArray(function(err,result){
    callback(result)
  })
}
MongoClient.connect(DB_CONN_STR,function(err,db){
  if(err){
    console.log(err)
  }else{
    findData(db,function(result){
      if(result.length>0){
       // console.log(result)
       // res.send('成功')
        
       req.session.username = result[0].username
        //console.log(result[0].username)
        res.redirect('/')
        //一种路由跳转
      }else{
        //console.log(result)
        //res.send('失败')
         res.redirect('/login')
      }
    })
  }
})

})

module.exports = router;
