import CommentTemplate from './Comment.hbs';
import BaseComponent from '../BaseComponent.js';
import './Comment.scss';

/**
 * Класс для реализации компонента ItemCard
 */
export default class Comment extends BaseComponent {
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
        super.render(this.prepareRenderData(context), CommentTemplate);
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} наполнение для формы
     */
    prepareRenderData(context) {
        return {
            comments: {...context},
        };
    }
}
