const WebSocket = require('ws');

const WebSocketServer = new WebSocket.Server({ port: '13000' });

let rooms = {
    room: [],
    admin: []
}

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

    console.log(room);
    console.log(newRoom);

    let usersCopy = rooms[room];

    usersCopy = usersCopy.filter(element => element.id !== user.id);

    rooms[room] = usersCopy;

    rooms[newRoom].push(user);

    console.log(rooms);

}

function isOnRoom(room, user) {

    let userList = rooms[getRoomIndex(room)].users;

    for (let i = 0; i < userList.length; i++) {
        if (userList[i] === user.id) {
            user.send('ayo lmao');
        }
    }

}

WebSocketServer.on('connection', (WebSocket) => {

    WebSocket.id = getUniqueID();

    
    rooms.room.push(WebSocket);
    
    console.log(rooms);

    WebSocket.on('message', (data, isBinary) => {

        let JSONData = JSON.parse(data);

        switch (JSONData.action) {
            case 'change-room':
                changeRoom(JSONData.room, JSONData.newRoom, WebSocket);
                break;
            case 'send-message':

                for(let i = 0; i < rooms[JSONData.room].length; i++){
                    rooms[JSONData.room][i].send(data, { binary: isBinary });
                }

                break;

        }

        /*WebSocketServer.clients.forEach((client) => {

            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }

        })*/

    })

})