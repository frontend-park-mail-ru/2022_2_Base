import '../templates.js';

export default class Header {
    #parent;

    constructor(parent, value) {
        this.#parent = parent;
    }

    render() {
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['footer.hbs']());
    }
}
