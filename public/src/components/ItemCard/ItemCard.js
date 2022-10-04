'use strict'

import '../templates.js'

export default class ItemCard {
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

    render(context) {
        // const data = this.prepareCategory(context);
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['ItemCard.hbs'](context));
    }

    // prepareCategory(context) {
    //     const data = {card: {}};
    //     data.card = {...context};
    //     return data;
    // }
}
