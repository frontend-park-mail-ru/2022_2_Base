import '../templates.js';
import BaseComponent from '../BaseComponent.js';

/**
 * Класс для реализации компонента Footer
 */
export default class Header extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента Footer
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     */
    render(e) {
        this._parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['footer.hbs'](e));
    }
}
