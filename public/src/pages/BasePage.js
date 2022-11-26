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
     * @param {HandlebarsTemplateDelegate} template шаблон для отрисовки
     */
    constructor(parent, template) {
        this.#parent = parent;
        this.#template = template;
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {

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
    removeEventListener(context) {
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {any} data контекст данных для страницы
     */
    render(data) {
        this.addListener();
        this.#parent.innerHTML = this.#template(data);
    }
}
