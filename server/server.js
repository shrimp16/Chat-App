const WebSocket = require('ws');

const WebSocketServer = new WebSocket.Server({ port: '13000' });

const RoomManager = require('./roomManager');
const roomManager = new RoomManager();

function heartbeat() {
    this.isAlive = true;
}

function getUniqueID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

function broadcastTo(room, message, isBinary) {

    let rooms = roomManager.getRooms();

    for (let i = 0; i < rooms[room].length; i++) {
        rooms[room][i].send(message, { binary: isBinary });
    }

}

WebSocketServer.on('connection', (WebSocket) => {

    WebSocket.id = getUniqueID();

    WebSocket.isAlive = true;

    WebSocket.on('pong', heartbeat);

    roomManager.addUserToRoom('room', WebSocket);

    WebSocket.on('message', (data, isBinary) => {

        let JSONData = JSON.parse(data);

        switch (JSONData.action) {
            case 'change-room':
                roomManager.changeRoom(JSONData.room, JSONData.newRoom, WebSocket);
                break;
            case 'send-message':
                broadcastTo(JSONData.room, data, isBinary);
                break;
            case 'create-room':
                roomManager.createRoom(JSONData.room, JSONData.newRoom, WebSocket);
                break;

        }
    })

})

setInterval(() => {
    WebSocketServer.clients.forEach((ws) => {
        if (ws.isAlive === false) {

            removeFromRoom(user, room);

            return ws.terminate();

        }

        ws.isAlive = false;
        ws.ping();
    })
}, 30000)