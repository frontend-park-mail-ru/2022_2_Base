import CommentTemplate from './Comment.hbs';
import BaseComponent from '../BaseComponent.js';
import './Comment.scss';

/**
 * Класс для реализации компонента Comment
 */
export default class Comment extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента Comment
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
        super.render(super.prepareCategory(context), CommentTemplate);
    }
}
