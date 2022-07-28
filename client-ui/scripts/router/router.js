const pages = [
    'home'
]

export default class Router {

    constructor() {
        window.addEventListener('hashchange', () => {
            this.routeChangeHandler();
        })
        this.body = document.querySelector('#body');
        this.routeChangeHandler();
    }

    async routeChangeHandler() {
        let hash = window.location.hash.substring(1);
        hash = hash.split('?', hash.length - 1)[0];

        if(hash === ''){
            hash = 'home';
        }

        this.body.innerHTML = '';

        const exists = pages.find(e => {
            if(e === hash){
                return true;
            }
        })

        if(!exists){
            hash = '404';
        }

        const loader = await import(`./pages/${hash}.js`);

        new loader.default();
    }
}