import '../templates.js';

export default class Form {
    #parent;

    constructor(parent, value) {
        this.#parent = parent;
    }

    render(context) {
        const data = this.prepareForm(context);
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['form.hbs'](data));
    }

    prepareForm(context) {
        return {
            field: {...context.fields},
            button: context.button.buttonValue,
        };
    }
}
