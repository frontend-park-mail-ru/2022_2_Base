import addCommentPageTemplate from './AddCommentPage.hbs';
import BasePage from '../BasePage.js';
// import request from '../../modules/ajax.js';
import './AddCommentPage.scss';

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
            addCommentPageTemplate,
        );
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    async render(config) {
        super.render(config);
    }
}
