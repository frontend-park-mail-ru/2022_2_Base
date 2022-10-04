'use strict'

import '../templates.js'

export default class Form {
    #data
    #parent

    constructor(parent, value) {
        this.#parent = parent;
        this.#data = value
    }

    render(context) {
        const data = this.prepareForm(context);
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['Form.hbs'](data));
    }

    prepareForm(context) {
        console.log(context.button.buttonValue)
        const data = {field: {},
                        button: ''
                    };
        data.field = {...context.fields};
        data.button = context.button.buttonValue;
        return data;
    }
}