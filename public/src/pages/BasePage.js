/**
 * Базовый класс для реализации страницы.
 */
export default class BasePage {
    #parent;
    #template;

    /**
     * Конструктор, создающий базовый класс реализации страницы.
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     * @param {function} template шаблон для отрисовки
     */
    constructor(parent, template) {
        this.#parent = parent;
        this.#template = template;
    }

    /**
     * Метод, добавляющий слушатели.
     * @param {any} context контекст данных для страницы
     */
    startEventListener(context) {
    }

    /**
     * Метод, удаляющий слушатели.
     * @param {any} context контекст данных для страницы
     */
    stopEventListener(context) {
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {any} data контекст данных для страницы
     */
    render(data) {
        this.#parent.innerHTML = this.#template(data);
    }
}
