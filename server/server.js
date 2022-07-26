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

function changeRoom(room, newRoom, user) {

    let usersCopy = rooms[room];

    usersCopy = usersCopy.filter(element => element.id !== user.id);

    rooms[room] = usersCopy;

    rooms[newRoom].push(user);

}

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

                for(let i = 0; i < rooms[JSONData.room].length; i++){
                    rooms[JSONData.room][i].send(data, { binary: isBinary });
                }

                break;

        }
    })

})