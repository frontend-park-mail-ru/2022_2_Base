import * as AddToCartButtonTemplate from './AddToCartButton.hbs';
import BaseComponent from '../BaseComponent.js';
import './AddToCartButton.scss';
import cartStore from '../../stores/CartStore.js';
import {cartAction, CartActionTypes} from '../../actions/cart.js';
import {config} from '../../config';

/**
 * Класс для реализации компонента AddToCartButton
 */
export default class AddToCartButton extends BaseComponent {
    bindListenClickButtonAddIntoCart: addListenerFunction | null;
    buttonAddIntoCart: HTMLElement | null;
    /**
     * Конструктор, создающий класс компонента AddToCartButton
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent);
        this.bindListenClickButtonAddIntoCart = null;
        this.buttonAddIntoCart = null;

        cartStore.addListener(this.buttonCreate, CartActionTypes.ADD_TO_CART);

        cartStore.addListener(this.buttonAdd, CartActionTypes.INCREASE_NUMBER);

        cartStore.addListener(this.buttonMinus, CartActionTypes.DECREASE_NUMBER);
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
            const count = parseInt(amount.textContent ?? '');
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
            const count = parseInt(amount.textContent ?? '');

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
     * @param target - элемент, вызвавший обработчик
     */
    listenClickButtonAddIntoCart({target}: Event) {
        if (target instanceof HTMLElement && target.id && target.id.includes('/')) {
            const [elementID, itemID] = target.id.split('/');
            switch (elementID) {
            case 'button-add-to-cart':
                cartAction.addToCart(itemID);
                break;
            case 'button-minus_cart':
                cartAction.decreaseNumber(itemID);
                break;
            case 'button-plus_cart':
                cartAction.increaseNumber(itemID);
                break;
            }
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    override startEventListener() {
        this.buttonAddIntoCart = document.getElementById('block-button-add-to-cart');
        if (this.buttonAddIntoCart) {
            this.bindListenClickButtonAddIntoCart = this.listenClickButtonAddIntoCart.bind(this);
            this.buttonAddIntoCart.addEventListener('click', this.bindListenClickButtonAddIntoCart);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
        if (this.buttonAddIntoCart) {
            this.buttonAddIntoCart.removeEventListener('click',
                this.bindListenClickButtonAddIntoCart ?? config.noop);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
     * @param context - контекст отрисовки шаблона
     */
    override render(context: object) {
        super.render(context, AddToCartButtonTemplate);
        this.startEventListener();
    }
}
