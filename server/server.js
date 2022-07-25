const WebSocket = require('ws');

const WebSocketServer = new WebSocket.Server({ port: '13000' });

function getUniqueID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

WebSocketServer.on('connection', (WebSocket) => {

    WebSocket.id = getUniqueID();

    WebSocket.on('message', (data, isBinary) => {

        console.log(WebSocket.id);

        WebSocketServer.clients.forEach((client) => {

            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }

        })

    })
    
})