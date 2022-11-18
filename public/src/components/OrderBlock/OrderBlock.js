import orderBlockTemplate from './OrderBlock.hbs';
import OrderItem from '../OrderItem/OrderItem.js';
import BaseComponent from '../BaseComponent.js';

import './OrderBlock.scss';

/**
 * Класс для реализации компонента OrderBlock
 */
export default class OrderBlock extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента OrderBlock
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);
    }

    /**
     * Метод, загружающий карты.
     * @param {string} classToGet имя класса, в который надо вставить карту
     * @param {string} reqPath путь для api запроса к беку
     */
    async loadCards(classToGet, reqPath) {
        const rootElement = document.getElementById('order-block__itemcards-block');

        const itemElement = document.createElement('div');
        itemElement.id = `${classToGet}`;
        itemElement.classList.add('order-block__itemcard');
        rootElement.insertAdjacentElement('beforeend', itemElement);
        /* rendering card itself */
        this.orderItem = new OrderItem(itemElement);

        this.orderItem.render();
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {

    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {

    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {Object} context контекст отрисовки шаблона
     */
    async render(context) {
        super.render(this.prepareRenderData(context), orderBlockTemplate);
        await this.loadCards('orderItem');
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} значение категории из контекста отрисовки
     */
    prepareRenderData(context) {
        return {context};
    }
}
