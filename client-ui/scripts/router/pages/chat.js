export default class Chat {

    constructor() {

        this.body = document.getElementById('body');

        this.loadPage();

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

}