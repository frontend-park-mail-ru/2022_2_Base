import TopCategoryTemplate from './topCategory.hbs';
import BaseComponent from '../BaseComponent';
import './topCategory.scss';

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
        super.render(super.prepareCategory(context), TopCategoryTemplate);
    }
}
