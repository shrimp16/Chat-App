export default class Chat {

    constructor() {

        this.body = document.getElementById('body');

        this.loadPage();

    }

    loadPage() {
        
        this.body.innerHTML = `
            <div class="message-container" id="message-container"></div>
        `

    }

}