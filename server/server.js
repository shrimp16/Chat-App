const WebSocket = require('ws');
const server = new WebSocket.Server({ port: '13000'});

server.on('connection', socket => {

    socket.on('message', message => {
        socket.send(`User: ${message}`)
    })

})