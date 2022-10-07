import '../templates.js';

/**
 * Класс для реализации компонента Header
 */
export default class Header {
    /**
     * Приватное поле класса, хранящее parent HTML-элемент
     * @type {Element}
     */
    #parent;

    /**
     * Конструктор, создающий класс компонента Header
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {Boolean} sessionValue контекст отрисовки шаблона, содержащий информацию об авторизации
     */
    render(sessionValue) {
        const session = {session: sessionValue};
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['header.hbs'](session));
    }
}
