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
     * @param {InsertPosition} insertInPlace куда вставлять относительно _parent элемента
     */
    render(context, templateName, insertInPlace = 'afterbegin') {
        this._parent.insertAdjacentHTML(insertInPlace,
            templateName(context));
    }

    /**
     * Метод, подготавливающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} значение категории из контекста отрисовки
     */
    prepareCategory(context) {
        return {item: {...context}};
    }
}
