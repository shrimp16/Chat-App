export default class Home {

    constructor() {

        this.body = document.getElementById('body');

        this.loadPage();

    }

    loadPage() {
        let HTML = `
            <div class="home">
                <input class="join-input" id="join-input" type="text" placeholder="Username...">
                <button class="join-button" id="join">Join</button>
            </div>
        `

        this.body.innerHTML = HTML;
        this.loadElements();
    }

    loadElements() {
        document.getElementById('join').addEventListener('click', () => {
            let username = document.getElementById('join-input').value;
            sessionStorage.setItem('username', username);
            window.location.hash = 'chat';
        })
    }
}