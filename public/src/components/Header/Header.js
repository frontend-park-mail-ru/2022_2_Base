'use strict'

import '../templates.js'

export default class Header {
    #data
    #parent

    constructor(parent, value) {
        this.#parent = parent;
        this.#data = value;
    }

    get items() {
        return this.#data
    }

    set items(value) {
        this.#data = value
    }

    async render(session) {
        await this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['Header.hbs'](session));
    }
}