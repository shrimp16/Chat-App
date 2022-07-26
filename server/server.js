const WebSocket = require('ws');

const WebSocketServer = new WebSocket.Server({ port: '13000' });

let rooms = {
    room: [],
    admin: []
}

function getUniqueID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

function broadcastTo(room, message, isBinary){

    for(let i = 0; i < rooms[room].length; i++){
        rooms[room][i].send(message, { binary: isBinary });
    }

}

function changeRoom(room, newRoom, user) {

    let usersCopy = rooms[room];

    usersCopy = usersCopy.filter(element => element.id !== user.id);

    rooms[room] = usersCopy;

    rooms[newRoom].push(user);

};

WebSocketServer.on('connection', (WebSocket) => {

    WebSocket.id = getUniqueID();

    rooms.room.push(WebSocket);
    
    WebSocket.on('message', (data, isBinary) => {

        let JSONData = JSON.parse(data);

        switch (JSONData.action) {
            case 'change-room':
                changeRoom(JSONData.room, JSONData.newRoom, WebSocket);
                break;
            case 'send-message':
                broadcastTo(JSONData.room, data, isBinary);
                break;

        }
    })

})