import '../templates.js';
import BaseComponent from '../BaseComponent.js';

/**
 * Класс для реализации компонента Form
 */
export default class Form extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента Form
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
     * @param {Object} context контекст отрисовки шаблона
     */
    render(context) {
        const data = this.prepareForm(context);
        this._parent.insertAdjacentHTML('afterbegin', window.Handlebars.templates['form.hbs'](data));
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} наполнение для формы
     */
    prepareForm(context) {
        return {
            field: {...context.fields},
            button: context.button.buttonValue,
        };
    }
}
