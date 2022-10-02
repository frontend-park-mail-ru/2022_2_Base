'use strict'

import '../templates.js'

export default class Header {
    #data
    #parent

    constructor(parent, value) {
        this.#parent = parent;
        this.#data = value
    }

    get items() {
        return this.#data
    }

    set items(value) {
        this.#data = value
    }

    render() {
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['Footer.hbs']());
    }
}