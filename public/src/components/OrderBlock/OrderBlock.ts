import orderBlockTemplate from './OrderBlock.hbs';
import BaseComponent from '../BaseComponent.js';
import './OrderBlock.scss';

/**
 * Класс для реализации компонента OrderBlock
 */
export default class OrderBlock extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента OrderBlock
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param context - контекст отрисовки шаблона
     */
    override render(context: object) {
        super.render(super.prepareCategory(context), orderBlockTemplate, 'afterend');
    }
}
