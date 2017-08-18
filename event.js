const EventEmitter = require('events')

class MyEmitter extends EventEmitter{}

const myEmitter = new MyEmitter()

myEmitter.on('event',()=>{
    console.log("an event occurrend")
})

myEmitter.on('play',(track)=>{
    console.log(`正在播放:《${track}》`)
})

myEmitter.emit('event')
myEmitter.emit('play',"美国队长")