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
     * Метод, отрисовывающий компонент.
     * @param {any} data контекст данных для компонента
     */
    render(data) {

    }

    /**
     * Метод, подготавливающий к отрисовки компонента.
     * @param {any} context контекст данных для компонента
     */
    prepareCategory(context) {

    }
}
