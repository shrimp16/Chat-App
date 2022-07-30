export default class Chat {

    constructor() {

        this.body = document.getElementById('body');

        this.loadPage();
        this.prepareElements();

        this.currentRoom = 'room';
        this.roomCreation = 'room';

    }

    loadPage() {
        
        this.body.innerHTML = `
            <div class="message-container" id="message-container">
                <div class="message">
                    <p class="message-text">This is a message</p>
                </div>
            </div>
            <div class="message-input">
                <input id="message-input" placeholder="Message..." type="text">
                <button id="send-message">Send</button>
            </div>
        `

    }

    prepareElements(){

        const socket = new WebSocket('ws://localhost:13000');

        socket.onmessage = ({ data }) => {
            console.log(data);
        }

        document.getElementById('send-message').addEventListener('click', () => {
            const data = {
                user: sessionStorage.getItem('username'),
                action: 'send-message',
                message: document.getElementById('message-input').value,
                room: this.currentRoom
            }

            socket.send(JSON.stringify(data));
            document.getElementById('message-input').value = '';
        })
    }

}