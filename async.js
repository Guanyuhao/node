var async = require('async')

//串行无关联
console.time('test')
// async.series([
//     function(callback){
//         setTimeout(function(){
//             callback(null,'one')
//         },1000)
//     },
//     function(callback){
//         setTimeout(function(){
//             callback(null,'two')
//         },2000)
//     }
// ],function(err,results){
//     console.log(results)
//     console.timeEnd('test')
// })
//并行
// async.parallel([
//     function(callback){
//         setTimeout(function(){
//             callback(null,'one')
//         },1000)
//     },
//     function(callback){
//         setTimeout(function(){
//             callback(null,'two')
//         },2000)
//     }
// ],function(err,results){
//     console.log(results)
//     console.timeEnd('test')
// })
//串行有关联
async.waterfall([
    function(callback){
        callback(null,'one','two')
    },
    function(arg1,arg2,callback){
        callback(null,arg1,arg2,'three')
    },
    function(arg1,arg2,arg3,callback){
        callback(null,[arg1,arg2,arg3,'done'])
    }
],function(err,results){
    console.log(results)
})