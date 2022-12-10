/**
 * Базовый класс для реализации компонентов.
 */
export default class BaseComponent {
    _parent: HTMLElement;

    /**
     * Конструктор, создающий базовый класс реализации компонента.
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    protected constructor(parent: HTMLElement) {
        this._parent = parent;
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {}

    /**
     * Метод, отрисовывающий компонент.
     * @param context - контекст данных для компонента
     * @param templateName - скомпилированный шаблон шаблона
     * @param insertInPlace - место вставки относительно _parent элемента
     */
    render(context: unknown,
        templateName: HandlebarsTemplateDelegate,
        insertInPlace: InsertPosition = 'afterbegin') {
        this._parent.insertAdjacentHTML(insertInPlace,
            templateName(context));
    }

    /**
     * Метод, подготавливающий наполнение для формы, исходя из контекста
     * @param context - контекст отрисовки шаблона
     * @returns значение категории из контекста отрисовки
     */
    prepareCategory(context: object) {
        return {item: {...context}};
    }
}
