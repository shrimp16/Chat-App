const socket = new WebSocket('ws://localhost:13000')

let message = document.getElementById('message');

socket.onmessage = ({ data }) => {
    console.log(data);
}

document.getElementById('send').addEventListener('click', () => {
    socket.send(message.value);
    message.value = '';
})