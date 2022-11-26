import AddToCartButtonTemplate from './AddToCartButton.hbs';
import BaseComponent from '../BaseComponent.js';
import './AddToCartButton.scss';
import cartStore from '../../stores/CartStore.js';
import {cartAction} from '../../actions/cart.js';

/**
 * Класс для реализации компонента AddToCartButton
 */
export default class AddToCartButton extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента ItemCard
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);
    }

    /**
     * Функция, увеличение количество
     */
    buttonCreate() {
        const addToCartButton = document.getElementById(
            `button-add-to-cart/${cartStore.getContext(cartStore._storeNames.currID)}`);
        const amountSelector = document.getElementById(
            `amount-selector/${cartStore.getContext(cartStore._storeNames.currID)}`);
        if (!!addToCartButton && !!amountSelector) {
            amountSelector.style.display = 'grid';
            addToCartButton.style.display = 'none';

            const amount = document.getElementById(
                `amount/${cartStore.getContext(cartStore._storeNames.currID)}`);
            if (amount) {
                amount.textContent = '1';
            }
        } else {
            console.warn('Элементы не найдены');
        }
    }

    /**
     * Функция для увеличения количества товара в корзине
     */
    buttonAdd() {
        const amount = document.getElementById(
            `amount/${cartStore.getContext(cartStore._storeNames.currID)}`);
        if (amount) {
            const count = parseInt(amount.textContent);
            amount.textContent = (count + 1).toString();
        }
    }

    /**
     * Функция для уменьшения количества товара в корзине
     */
    buttonMinus() {
        const amount = document.getElementById(
            `amount/${cartStore.getContext(cartStore._storeNames.currID)}`);
        if (amount) {
            const count = parseInt(amount.textContent);

            if (count === 1) {
                const amountSelector = document.getElementById(
                    `amount-selector/${cartStore.getContext(cartStore._storeNames.currID)}`);
                const addToCartButton = document.getElementById(
                    `button-add-to-cart/${cartStore.getContext(cartStore._storeNames.currID)}`);
                if (!!addToCartButton && !!amountSelector) {
                    amountSelector.style.display = 'none';
                    addToCartButton.style.display = 'flex';
                } else {
                    console.warn(
                        'Элементы не найдены: addToCartButton, addToCartButton');
                }
            } else {
                amount.textContent = (count - 1).toString();
            }
        }
    }


    /**
     * Функция, обрабатывающая клики на кнопку добавить в корзину
     * @param {Event} event контекст события для обработки
     */
    listenClickButtonAddIntoCart(event) {
        event.preventDefault();
        const target = event.target;
        let elementId = target.id;
        let itemId;
        if (elementId) {
            if (elementId.includes('/')) {
                [elementId, itemId] = elementId.split('/');
                switch (elementId) {
                case 'button-add-to-cart':
                    this.buttonCreate(); // убрать
                    cartAction.addToCart(itemId);
                    break;
                case 'button-minus_cart':
                    this.buttonMinus(); // убрать
                    cartAction.decreaseNumber(itemId);
                    break;
                case 'button-plus_cart':
                    this.buttonAdd(); // убрать
                    cartAction.increaseNumber(itemId);
                    break;
                }
            }
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        const buttonAddIntoCart = document.getElementById('block-button-add-to-cart');
        if (buttonAddIntoCart) {
            buttonAddIntoCart.addEventListener('click', this.listenClickButtonAddIntoCart.bind(this));
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const buttonAddIntoCart = document.getElementById('block-button-add-to-cart');
        if (buttonAddIntoCart) {
            buttonAddIntoCart.removeEventListener('click', this.listenClickButtonAddIntoCart);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
     * @param {Object} context контекст отрисовки шаблона
     */
    render(context) {
        super.render(this.prepareRenderData(context), AddToCartButtonTemplate);
        this.startEventListener();
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} наполнение для формы
     */
    prepareRenderData(context) {
        return {
            id: context.id,
            amount: context.amount,
        };
    }
}
