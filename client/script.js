let un = prompt('username');

let socket;

let room = 'room';

let roomCreation;

if(un){
    socket = new WebSocket('ws://localhost:13000');

    socket.onmessage = ({ data }) => {

        console.log(data);

        if(data === 'Invalid room'){
            room = 'room';
        }

        if(data === 'Created room'){
            room = roomCreation;
        }

    }
    
    document.getElementById('send').addEventListener('click', () => {
        const data = {
            user: un,
            action: 'send-message',
            room: room
        }
    
        socket.send(JSON.stringify(data));
        message.value = '';
    })

    document.getElementById('change').addEventListener('click', () => {

        
        const data = {
            user: un,
            action: 'change-room',
            room: room
        }

        room = prompt('Room');

        data.newRoom = room;

        console.log(data);
        
        socket.send(JSON.stringify(data));
    })

    document.getElementById('create').addEventListener('click', () => {

        const data = {
            user: un,
            action: 'create-room',
            room: room,
            roomName: 'lmao-exdi'
        }

        roomCreation = 'lmao-exdi';

        socket.send(JSON.stringify(data));
    })
}

let message = document.getElementById('message');