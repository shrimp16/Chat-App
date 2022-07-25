const socket = new WebSocket('ws://localhost:13000')

let message = document.getElementById('message');

let un = prompt('username');

socket.onmessage = ({ data }) => {
    console.log(data);
}

document.getElementById('send').addEventListener('click', () => {
    socket.send(`${un} : ${message.value}`);
    message.value = '';
})