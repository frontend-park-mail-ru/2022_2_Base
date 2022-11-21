import ProductPagePageTemplate from './ProductPage.hbs';
import BasePage from '../BasePage.js';
import './ProductPage.scss';
import ProductHeader from '../../components/ProductHeader/ProductHeader.js';
import cartStore from '../../stores/CartStore.js';
import {cartAction, CartActionTypes} from '../../actions/cart.js';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class ProductPage extends BasePage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            ProductPagePageTemplate,
        );
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
     addListener() {
        cartStore.addListener(this.buttonCreate,
            CartActionTypes.ADD_TO_CART);

        cartStore.addListener(this.buttonAdd,
            CartActionTypes.INCREASE_NUMBER,
        );

        cartStore.addListener(this.buttonMinus,
            CartActionTypes.DECREASE_NUMBER,
        );
    }

    /**
     * Функция, увеличение количество
     */
    buttonCreate() {
        const addToCartButton = document.getElementById(
            `product_button-add-to-cart/${cartStore.getContext(cartStore._storeNames.currID)}`);
        const amountSelector = document.getElementById(
            `product_amount-selector/${cartStore.getContext(cartStore._storeNames.currID)}`);
        if (!!addToCartButton && !!amountSelector) {
            amountSelector.style.display = 'grid';
            addToCartButton.style.display = 'none';

            const amount = document.getElementById(
                `product-amount/${cartStore.getContext(cartStore._storeNames.currID)}`);
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
            `product-amount/${cartStore.getContext(cartStore._storeNames.currID)}`);
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
            `product-amount/${cartStore.getContext(cartStore._storeNames.currID)}`);
        if (amount) {
            const count = parseInt(amount.textContent);

            if (count === 1) {
                const amountSelector = document.getElementById(
                    `product_amount-selector/${cartStore.getContext(cartStore._storeNames.currID)}`);
                const addToCartButton = document.getElementById(
                    `product_button-add-to-cart/${cartStore.getContext(cartStore._storeNames.currID)}`);
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
                case 'product_button-add-to-cart':
                    this.buttonCreate(); // убрать
                    cartAction.addToCart(itemId);
                    break;
                case 'product_button-minus_cart':
                    this.buttonMinus(); // убрать
                    cartAction.decreaseNumber(itemId);
                    break;
                case 'product_button-plus_cart':
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
        const buttonAddIntoCart = document.getElementById('product-block-button-add-to-cart');
        if (buttonAddIntoCart) {
            buttonAddIntoCart.addEventListener('click', this.listenClickButtonAddIntoCart.bind(this));
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const buttonAddIntoCart = document.getElementById('product-block-button-add-to-cart');
        if (buttonAddIntoCart) {
            buttonAddIntoCart.removeEventListener('click', this.listenClickButtonAddIntoCart);
        }
    }
    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render(config) {
        const data = {
            path: {
                name: 'Планшеты',
                href: '',
            },
            id: 1,
            name: 'Планшет Apple iPad 10.2 2021, 64 ГБ, Wi-Fi, серебристый',
            rating: '5.0',
            commentsHref: '',
            commentCount: 466,
            favourite: false,
            photo: './img/ipad.png',
            description: `Для работы. Для отдыха. Для творчества. Это iPad - 
                универсальный и доступный планшет, прекрасно проявляющий себя 
                во всех сферах: от создания музыки и видео до общения с друзьями 
                и близкими. С iPad всегда все очень просто.`,
            characteristics: [
                {
                    name: 'Цвет',
                    data: 'Серый',
                },
                {
                    name: 'Память',
                    data: '64 ГБ',
                },
                {
                    name: 'Экран',
                    data: '10.2" (2160x1620), IPS',
                },
                {
                    name: 'Процессор',
                    data: 'Apple A13 Bionic',
                },
                {
                    name: 'Версия ОС',
                    data: 'iPadOS',
                },
                {
                    name: 'Камеры',
                    data: '3 камеры, основная  8 МП, фронтальная 12 МП',
                },
            ],
            price: '35 890',
            salePrice: '31 580',
            discount: 12,
            date: ' 01 / 12 / 2022',
        };

        this.addListener();
        super.render(data);
        const pageHeader = new ProductHeader(document.getElementById('product-page-header'));
        pageHeader.render(data)
        this.startEventListener();
    }
}
