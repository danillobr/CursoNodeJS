const EventEmitter = require('events')

eventEmitter = new EventEmitter()

eventEmitter.on('start', () => {
    console.log('Durante')
})

console.log('Antes')

eventEmitter.emit('start')

console.log('Depois')

//é uma emissão síncrona, segue a lógica de event loop