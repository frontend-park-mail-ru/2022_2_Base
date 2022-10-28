import '../templates.js';
import BaseComponent from '../BaseComponent.js';

/**
 * Класс для реализации компонента Footer
 */
export default class AddressCard extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента AddressCard
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {context} context, с учетом которого будет произведен рендер
     */
    render(context) {
        super.render(context, 'addressCard.hbs');
    }
}
