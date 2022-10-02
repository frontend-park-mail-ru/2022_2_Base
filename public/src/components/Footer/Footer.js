'use strict'

import '../templates.js'

export default class Header {
    #data
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    get items() {
        return this.#data
    }

    set items(value) {
        this.#data = value
    }

    render() {
        this.#parent.innerHTML = window.Handlebars.templates['Footer.hbs']();
    }
}