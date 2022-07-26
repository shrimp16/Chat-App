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
            </div>
            <div class="message-input">
                <input id="message-input" placeholder="Message..." type="text">
                <button id="send-message">Send</button>
            </div>
        `

    }

    prepareElements() {

        const socket = new WebSocket('ws://localhost:13000');

        let scroll = 200;

        socket.onmessage = ({ data }) => {
            let JSONData = JSON.parse(data);
            document.getElementById('message-container').innerHTML += `
                <div class="message">
                    <p class="message-text">${JSONData.user} : ${JSONData.message}</p>
                </div>
            `

            document.getElementById('message-container').scroll({
                top: scroll,
            });

            scroll += 200;
        }

        document.getElementById('send-message').addEventListener('click', () => {
            
            if(document.getElementById('message-input').value === ''){
                return;
            }
            
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