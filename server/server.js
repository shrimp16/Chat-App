const WebSocket = require('ws');

const WebSocketServer = new WebSocket.Server({ port: '13000' });

WebSocketServer.on('connection', (WebSocket) => {

    WebSocket.on('message', (data, isBinary) => {

        WebSocketServer.clients.forEach((client) => {

            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }

        })

    })
    
})