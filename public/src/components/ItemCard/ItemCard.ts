import itemTemplate from './itemCard.hbs';
import BaseComponent from '../BaseComponent';
import './itemCard.scss';

/**
 * Класс для реализации компонента ItemCard
 */
export default class ItemCard extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента ItemCard
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
        super.render(context, itemTemplate);
    }
}
