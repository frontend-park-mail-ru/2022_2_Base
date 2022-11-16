import ordersPageTemplate from './OrdersPage.hbs';
import BasePage from '../BasePage.js';
// import request from '../../modules/ajax.js';
import './OrdersPage.scss';

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

    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    async render(config) {
        super.render(config);
    }
}
