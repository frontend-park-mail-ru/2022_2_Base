import '../templates.js';

/**
 * Класс для реализации компонента TopCategory
 */
export default class TopCategory {
    /**
     * Приватное поле класса, хранящее parent HTML-элемент
     * @type {Element}
     */
    #parent;

    /**
     * Конструктор, создающий класс компонента TopCategory
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
     * @param {Object} context контекст отрисовки шаблона
     */
    render(context) {
        this.#parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['topCategory.hbs'](this.prepareCategory(context)));
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} значение категории из контекста отрисовки
     */
    prepareCategory(context) {
        return {category: {...context}};
    }
}
