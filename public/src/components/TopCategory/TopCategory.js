'use strict'

import '../templates.js'

export default class TopCategory {
    #data
    #parent

    constructor(parent, value) {
        this.#parent = parent;
        this.#data = value;
    }

    render(context) {
        const data = this.prepareCategory(context);
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['TopCategory.hbs'](data));
    }

    prepareCategory(context) {
        const data = {category: {}};
        data.category = {...context};
        return data;
    }
}