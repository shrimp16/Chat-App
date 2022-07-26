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

    for(let i = 0; i < rooms.length; i++){
        if(rooms[i].id === roomId){
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

WebSocketServer.on('connection', (WebSocket) => {

    WebSocket.id = getUniqueID();

    rooms[0].users.push(WebSocket.id);

    console.log(rooms);
    WebSocket.on('message', (data, isBinary) => {

        let JSONData = JSON.parse(data);

        if (JSONData.action === 'change-room') {

            let usersCopy = rooms[getRoomIndex(JSONData.room)].users;

            usersCopy = usersCopy.filter(user => user !== WebSocket.id);

            rooms[getRoomIndex(JSONData.room)].users = usersCopy;

            rooms[getRoomIndex(JSONData.newRoom)].users.push(WebSocket.id);

        }

        WebSocketServer.clients.forEach((client) => {

            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }

        })

    })

})