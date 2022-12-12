import ProductHeaderTemplate from './ProductHeader.hbs';
import BaseComponent from '../BaseComponent';
import './ProductHeader.scss';
import {config} from '../../config';
import {_declension} from '../../modules/sharedFunctions';

/**
 * Класс для реализации компонента ProductHeader
 */
export default class ProductHeader extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента ProductHeader
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
     * @param context - контекст отрисовки шаблона
     */
    override render(context: productObj) {
        super.render(this.prepareRenderData(context), ProductHeaderTemplate);
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param context - контекст отрисовки шаблона
     * @returns наполнение для формы
     */
    prepareRenderData(context: productObj) {
        return {
            itemPath: config.href.product + '/' + context.id,
            commentPath: config.href.comment + '/' + context.id,
            categoryPath: config.href.category + '/' + context.category,
            categoryName: 'Категория',
            name: context.name,
            rating: context.rating,
            commentsCount: context.commentscount,
            commentsCountText:
                _declension(context.commentscount, ['отзыв', 'отзыва', 'отзывов']),
            favourite: context.favourite,
        };
    }
}
