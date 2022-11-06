/**
 * Базовый класс для реализации компонентов.
 */
export default class BaseComponent {
    _parent;

    /**
     * Конструктор, создающий базовый класс реализации компонента.
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        this._parent = parent;
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {

    }

    /**
     * Метод, отрисовывающий компонент.
     * @param {any} context контекст данных для компонента
     * @param {HandlebarsTemplateDelegate} templateName скомпилированный шаблон шаблона
     */
    render(context, templateName) {
        this._parent.insertAdjacentHTML('afterbegin',
            templateName(context));
    }

    /**
     * Метод, подготавливающий к отрисовки компонента.
     * @param {any} context контекст данных для компонента
     */
    prepareCategory(context) {
    }
}
