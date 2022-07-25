let un = prompt('username');

let socket;


if(un){
    socket = new WebSocket('ws://localhost:13000');

    socket.onmessage = ({ data }) => {
        console.log(data);
    }
    
    document.getElementById('send').addEventListener('click', () => {
        //socket.send(`${un} : ${message.value}`);
        const data = {
            user: un,
            action: 'change-room',
            room: 'default',
            newRoom: 'admin'
        }
    
        socket.send(JSON.stringify(data));
        message.value = '';
    })
}

let message = document.getElementById('message');