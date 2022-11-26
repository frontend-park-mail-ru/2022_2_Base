import orderBlockTemplate from './OrderBlock.hbs';
import BaseComponent from '../BaseComponent.js';

import './OrderBlock.scss';
import './../OrderItem/OrderItem.scss';


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
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} значение категории из контекста отрисовки
     */
    prepareRenderData(context) {
        return {orders: {...context}};
    }
}
