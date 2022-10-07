import '../templates.js';

export default class TopCategory {
    #parent;

    constructor(parent, value) {
        this.#parent = parent;
    }

    render(context) {
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['topCategory.hbs'](this.prepareCategory(context)));
    }

    prepareCategory(context) {
        return {category: {...context}};
    }
}
