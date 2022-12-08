import formTemplate from './form.hbs';
import BaseComponent from '../BaseComponent';
import './form.scss';

/**
 * Класс для реализации компонента Form
 */
export default class Form extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента Form
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
    override render(context: formContextObj) {
        super.render(this.prepareRenderData(context), formTemplate);
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param context - контекст отрисовки шаблона
     * @returns наполнение для формы
     */
    prepareRenderData(context: formContextObj) {
        return {
            field: {...context.fields},
            button: context.button.buttonValue,
        };
    }
}
