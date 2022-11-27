import errorPageTemplate from './errorPage.hbs';
import BasePage from '../BasePage';
import './ErrorPage.scss';

/**
 * Класс, реализующий страницу входа.
 */
export default class ErrorPage extends BasePage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            errorPageTemplate,
        );
    }
    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render() {
        super.render();
    }
}
