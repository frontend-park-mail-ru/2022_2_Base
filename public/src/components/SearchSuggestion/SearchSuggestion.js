import SearchSuggestionTemplate from './SearchSuggestion.hbs';
import BaseComponent from '../BaseComponent';
import './SearchSuggestion.scss';

/**
 * Класс для реализации компонента TopCategory
 */
export default class SearchSuggestion extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента TopCategory
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
     * @param {Object} context контекст отрисовки шаблона
     */
    render(context) {
        this._parent.innerHTML = '';
        console.log(super.prepareCategory(context));
        super.render(super.prepareCategory(context), SearchSuggestionTemplate);
    }
}
