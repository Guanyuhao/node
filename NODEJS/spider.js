var https = require('https')

var url = 'https://www.lagou.com'

var cheerio = require('cheerio')

function filter(html){
    var $=cheerio.load(html)
    //变成了jQuery
    var menu = $('.menu_main')
    var menuData = []
    menu.each(function(index,value){
        var menuTitle = $(value).find('h2').text()
        var menuLists = $(value).find('a')
        var menuList = []
        menuLists.each(function(index,value){
            menuList.push($(value).text())
        })
        menuData.push({
            menuTitle:menuTitle,
            menuList:menuList
        })
    })
    return menuData
}

function print (menu){
    menu.forEach(function(value){
        console.log(value.menuTitle)
        value.menuList.forEach(function(value){
            console.log('-'+value)
        })
    })
}

https.get(url,function(res){
    var html = ''
    res.on('data',function(data){
        //涉及到trigger个 触法 data 时间 
        html+=data
    })
    res.on('end',function(){
        
        print(filter(html))
    })
    res.on('error',function(err){
        console.log(err)
    })
})