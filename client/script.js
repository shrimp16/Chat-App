let un = prompt('username');

let socket;

let room = 'room';

if(un){
    socket = new WebSocket('ws://localhost:13000');

    socket.onmessage = ({ data }) => {
        console.log(data);
    }
    
    document.getElementById('send').addEventListener('click', () => {
        //socket.send(`${un} : ${message.value}`);
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
}

let message = document.getElementById('message');