// @ts-expect-error TS(2307): Cannot find module './errorPage.hbs' or its corres... Remove this comment to see the full error message
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
    constructor(parent: any) {
        super(
            parent,
            errorPageTemplate,
        );
    }
}
