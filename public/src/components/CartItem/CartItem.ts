import CartItemTemplate from './CartItem.hbs';
import BaseComponent from '../BaseComponent';
import './CartItem.scss';

/**
 * Класс для реализации компонента ItemCard
 */
export default class CartItem extends BaseComponent {
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
        super.render(this.prepareCategory(context), CartItemTemplate);
    }
}
