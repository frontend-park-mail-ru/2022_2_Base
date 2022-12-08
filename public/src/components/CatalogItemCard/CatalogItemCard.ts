import BaseComponent from '../BaseComponent';
import catalogItemCardTemplate from './CatalogItemCard.hbs';
import './CatalogItemCard.scss';

/**
 * Класс для реализации компонента CatalogItemCard
 */
export default class CatalogItemCard extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента PaymentCard
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param context - контекст с учетом которого будет произведен рендер
     */
    override render(context: Array<object>) {
        this._parent.insertAdjacentHTML('beforeend',
            catalogItemCardTemplate(super.prepareCategory(context)));
    }
}
