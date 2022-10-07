import '../templates.js'

export default class ItemCard {
    #parent;

    constructor(parent, value) {
        this.#parent = parent;
    }

    render(context) {
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['ItemCard.hbs'](context));
    }
}
