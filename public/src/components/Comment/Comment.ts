import CommentTemplate from './Comment.hbs';
import BaseComponent from '../BaseComponent';
import './Comment.scss';

/**
 * Класс для реализации компонента Comment
 */
export default class Comment extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента Comment
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
    override render(context: object) {
        super.render(super.prepareCategory(context), CommentTemplate);
    }
}
