import ordersPageTemplate from './OrdersPage.hbs';
import BasePage from '../BasePage.js';
// import request from '../../modules/ajax.js';
import './OrdersPage.scss';
import OrderBlock from '../../components/OrderBlock/OrderBlock.js';

/**
 * Класс, реализующий главную страницу
 */
export default class OrdersPage extends BasePage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            ordersPageTemplate,
        );
    }

    /**
     * Метод, загружающий карты.
     * @param {string} classToGet имя класса, в который надо вставить карту
     * @param {string} reqPath путь для api запроса к беку
     */
    async loadCards(classToGet, reqPath) {
        const rootElement = document.getElementById('orders-page__block');

        const blockElement = document.createElement('div');
        blockElement.id = `${classToGet}${String(1)}`;
        blockElement.classList.add('order-block');
        rootElement.before(blockElement);
        /* rendering card itself */
        this.orderBlock = new OrderBlock(blockElement);

        this.orderBlock.render();
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    async render(config) {
        super.render(config);
        await this.loadCards('orderBlock');
    }
}
