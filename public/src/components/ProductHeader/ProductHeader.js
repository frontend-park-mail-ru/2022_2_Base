import ProductHeaderTemplate from './ProductHeader.hbs';
import BaseComponent from '../BaseComponent.js';
import './ProductHeader.scss';
import sharedFunctions from '../../modules/sharedFunctions.js';

/**
 * Класс для реализации компонента ItemCard
 */
export default class ProductHeader extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента ItemCard
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
        super.render(this.prepareRenderData(context), ProductHeaderTemplate);
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} наполнение для формы
     */
     prepareRenderData(context) {
        return {
            path: context.path,
            name: context.name,
            rating: context.rating,
            commentsHref: context.commentsHref,
            commentsCount: context.commentsCount,
            commentsCountText: sharedFunctions._sklonenie(context.commentsCount, ['отзыв', 'отзыва', 'отзывов']),
            favourite: context.favourite,
        };
    }
}
