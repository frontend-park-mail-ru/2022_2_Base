import formTemplate from './form.hbs';
import BaseComponent from '../BaseComponent.js';
import './form.scss';

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
        super.render(this.prepareRenderData(context), formTemplate);
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} наполнение для формы
     */
    prepareRenderData(context) {
        return {
            field: {...context.fields},
            button: context.button.buttonValue,
        };
    }
}
