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
        //alert(111);
        // const template = Handlebars.compile('Header.hbs')

       // const template =
        //this.#parent.innerHTML = window.Handlebars.precompile("{{aString.trim}}");
        this.#parent.innerHTML = window.Handlebars.templates['Header.hbs']();

        // const template = Handlebars.compile("What is age of {{name}}")
        // this.#parent.innerHTML = template({name: "Kyle"});
        // console.log(template({ doesWhat: "rocks!" }));
        // this.#parent.innerHTML = handlebars.templates["Header.hbs"];
        //this.#parent.innerHTML =
        // Handlebars.registerPartial('HeaderComponent', Handlebars.templates['Header.hbs']);
        // this.#parent.insertAdjacentHTML('beforebegin', Handlebars.templates['Header.hbs']);
        // this.#parent.insertAdjacentHTML('afterbegin', handlebars.templates['Header.hbs']);
    }
}