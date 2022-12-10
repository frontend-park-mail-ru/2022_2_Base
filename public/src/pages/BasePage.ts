/**
 * Базовый класс для реализации страницы.
 */
export default abstract class BasePage {
    #parent;
    readonly #template;

    /**
     * Конструктор, создающий базовый класс реализации страницы.
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     * @param template - шаблон для отрисовки
     */
    protected constructor(parent: Element, template: HandlebarsTemplateDelegate) {
        this.#parent = parent;
        this.#template = template;
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    abstract addListener(): void

    /**
     * Метод, добавляющий слушатели.
     * @param context - контекст данных для страницы
     */
    abstract startEventListener(context: object): void

    /**
     * Метод, удаляющий слушатели.
     * @param context - контекст данных для страницы
     */
    abstract removeEventListener(context: object): void

    /**
     * Метод, отрисовывающий страницу.
     * @param data - контекст данных для страницы
     */
    render(data: object) {
        this.addListener();
        this.#parent.innerHTML = this.#template(data);
    }
}
