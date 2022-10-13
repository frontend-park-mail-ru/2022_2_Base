import '../templates.js';
import BaseComponent from '../BaseComponent.js';

/**
 * Класс для реализации компонента TopCategory
 */
export default class TopCategory extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента TopCategory
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
        this._parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['topCategory.hbs'](this.prepareCategory(context)));
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} значение категории из контекста отрисовки
     */
    prepareCategory(context) {
        return {category: {...context}};
    }
}
