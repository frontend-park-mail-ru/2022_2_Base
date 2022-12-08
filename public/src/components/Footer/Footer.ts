import footerTemplate from './footer.hbs';
import BaseComponent from '../BaseComponent';
import './footer.scss';

/**
 * Класс для реализации компонента Footer
 */
export default class Header extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента Footer
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     */
    override render() {
        super.render(null, footerTemplate);
    }
}
