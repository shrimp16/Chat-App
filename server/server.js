const WebSocket = require('ws');

const WebSocketServer = new WebSocket.Server({ port: '13000' });

let rooms = [
    {
        id: 'default',
        users: []
    },
    {
        id: 'admin',
        users: []
    }
]

function getRoomIndex(roomId) {

    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].id === roomId) {
            return i;
        }
    }

    return 'not found';

}

function getUniqueID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

function changeRoom(room, newRoom, user) {

    let usersCopy = rooms[getRoomIndex(room)].users;

    usersCopy = usersCopy.filter(user => user !== WebSocket.id);

    rooms[getRoomIndex(room)].users = usersCopy;

    rooms[getRoomIndex(newRoom)].users.push(user);

}

WebSocketServer.on('connection', (WebSocket) => {

    WebSocket.id = getUniqueID();

    rooms[0].users.push(WebSocket.id);

    console.log(rooms);
    WebSocket.on('message', (data, isBinary) => {

        let JSONData = JSON.parse(data);

        switch (JSONData.action) {
            case 'change-room':
                changeRoom(JSONData.room, JSONData.newRoom, WebSocket.id);
                break;
        }

        WebSocketServer.clients.forEach((client) => {

            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }

        })

    })

})