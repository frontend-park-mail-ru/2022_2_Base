import TopCategoryTemplate from './topCategory.hbs';
import BaseComponent from '../BaseComponent';
import './topCategory.scss';

/**
 * Класс для реализации компонента TopCategory
 */
export default class TopCategory extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента TopCategory
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
     * @param context - контекст отрисовки шаблона
     */
    override render(context: object) {
        super.render(super.prepareCategory(context), TopCategoryTemplate);
    }
}
