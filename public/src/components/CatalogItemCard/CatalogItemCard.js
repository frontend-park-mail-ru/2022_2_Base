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
     * @param {Array} context, с учетом которого будет произведен рендер
     */
    render(context) {
        this._parent.insertAdjacentHTML('beforeend',
            catalogItemCardTemplate(this.prepareRenderData(context)));
    }

    /**
     * Метод, подготавливавающий наполнение карточками товара
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} значение категории из контекста отрисовки
     */
    prepareRenderData(context) {
        return {catalogCardItem: {...context}};
    }
}
