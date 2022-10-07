import '../templates.js'

export default class TopCategory {
    #parent;

    constructor(parent, value) {
        this.#parent = parent;
    }

    render(context) {
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['TopCategory.hbs'](this.prepareCategory(context)));
    }

    prepareCategory(context) {
        return {category: {...context}};
    }
}
