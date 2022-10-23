import '../templates.js';

/**
 * Класс для реализации компонента Footer
 */
export default class PaymentCard {
    /**
     * Приватное поле класса, хранящее parent HTML-элемент
     * @type {Element}
     */
    #parent;

    /**
     * Конструктор, создающий класс компонента Footer
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     */
    render(context) {
        this.#parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['paymentCard.hbs'](context));
    }
}
