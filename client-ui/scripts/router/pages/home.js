export default class Home {

    constructor() {

        this.body = document.getElementById('body');

        this.loadPage();

    }

    loadPage() {
        let HTML = `
            <div class="home">
                <input class="join-input" type="text" placeholder="Username...">
                <button class="join-button" id="join">Join</button>
            </div>
        `

        this.body.innerHTML = HTML;
    }
}