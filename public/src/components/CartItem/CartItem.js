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
        Object.keys(context).forEach((key) => {
            context[key].price = sharedFunctions._truncate(context[key].price);
            context[key].salePrice = context[key].salePrice ?
                sharedFunctions._truncate(context[key].salePrice) : null;
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
