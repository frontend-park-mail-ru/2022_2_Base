import CartItemTemplate from './CartItem.hbs';
import BaseComponent from '../BaseComponent.js';
import './CartItem.scss';
import sharedFunctions from '../../modules/sharedFunctions.js';

/**
 * Класс для реализации компонента ItemCard
 */
export default class CartItem extends BaseComponent {
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
        super.render(this.prepareCategory(context), CartItemTemplate);
    }

    /**
     * Метод, подготавливающий цену доставки для отрисовки
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} значение контекста с ценой доставки готовой для отрисовки
     */
    _getPrice(context) {
        context.forEach((key) => {
            key.item.price = sharedFunctions._truncate(key.item.price);
            key.item.lowprice = key.item.lowprice ?
                sharedFunctions._truncate(key.item.lowprice) : null;
        });
        return context;
    }

    /**
     * Метод, подготавливающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} значение категории из контекста отрисовки
     */
    prepareCategory(context) {
        return {item: {...this._getPrice(context)}};
    }
}
