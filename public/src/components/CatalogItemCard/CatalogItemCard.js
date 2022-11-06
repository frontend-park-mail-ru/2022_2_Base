import BaseComponent from '../BaseComponent.js';
import catalogItemCardTemplate from './CatalogItemCard.hbs';
import './CatalogItemCard.scss';

/**
 * Класс для реализации компонента CatalogItemCard
 */
export default class CatalogItemCard extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента PaymentCard
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);
    }

    /**
     * Функция для передачи в слушателе click на название товара
     * @param {object} event - событие
     */
    async listenClickOnItemTitle(event) {
        event.preventDefault();


        /*  Переход на страницу товара */
    }

    /**
     * Функция для передачи в слушателе click на значок лайка
     * @param {object} event - событие
     */
    async listenClickLikeIcon(event) {
        event.preventDefault();

        /*  Добавление товара в избранное */
    }

    /**
     * Функция для передачи в слушателе click на кнопку В корзину
     * @param {object} event - событие
     */
    async listenClickAddToCart(event) {
        event.preventDefault();

        const addToCartButton = document.getElementById('button-add-to-cart');
        if (addToCartButton) {
            /*  Добавление товара в корзину */
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        const addToCartButton = document.getElementById('button-add-to-cart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', this.listenClickAddToCart);
        }

        const itemTitle = document.getElementById('item-title');
        if (itemTitle) {
            itemTitle.addEventListener('click', this.listenClickOnItemTitle);
        }

        const itemPhoto = document.getElementById('catalog-item-pic');
        if (itemPhoto) {
            itemPhoto.addEventListener('click', this.listenClickOnItemTitle);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const addToCartButton = document.getElementById('button-add-to-cart');
        if (addToCartButton) {
            addToCartButton.removeEventListener('click', this.listenClickAddToCart);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {context} context, с учетом которого будет произведен рендер
     */
    render(context) {
        super.render(context, catalogItemCardTemplate);
        this.startEventListener();
    }
}
