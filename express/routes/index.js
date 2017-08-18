var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',
    isShow:false,
    username:req.session.username
   });
});
//注册
router.get('/registor',function(req,res,next){
  res.render('registor',{})
})
//登陆
router.get('/login',function(req,res,next){
  res.render('login',{})
})
//注销
router.get('/logout',function(req,res,next){
  
  //req.session.username = undefined
 // res.redirect('/')
 //方法二
  req.session.destroy(function(err){
    res.redirect('/')
  })
  
})
//评论
router.get('/comment',function(req,res,next){
  res.render('comment',{})
})
module.exports = router;
