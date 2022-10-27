import '../templates.js';
import BasePage from '../BasePage.js';
import errorMessage from '../../modules/ErrorMessage.js';

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
            window.Handlebars.templates['ErrorPage.hbs'],
        );
    }
    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render(config) {
        super.render(this.context);
        errorMessage.render404(document.getElementById('content'));
    }
}
