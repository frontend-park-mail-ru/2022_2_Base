import '../templates.js'

export default class Header {
    #parent;

    constructor(parent, value) {
        this.#parent = parent;
    }

    render(sessionValue) {
        const session = {session: sessionValue};
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['Header.hbs'](session));
    }
}
