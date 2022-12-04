import orderBlockTemplate from './OrderBlock.hbs';
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
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {Object} context контекст отрисовки шаблона
     */
    async render(context) {
        super.render(super.prepareCategory(context), orderBlockTemplate, 'afterend');
    }
}
