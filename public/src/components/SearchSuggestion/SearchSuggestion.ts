import SearchSuggestionTemplate from './SearchSuggestion.hbs';
import BaseComponent from '../BaseComponent';
import './SearchSuggestion.scss';

/**
 * Класс для реализации компонента TopCategory
 */
export default class SearchSuggestion extends BaseComponent {
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
        this._parent.innerHTML = '';
        super.render(super.prepareCategory(context), SearchSuggestionTemplate);
    }
}
