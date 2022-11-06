// Базовый компонент
import BaseComponent from '../components/BaseComponent.js';

/**
 * Класс, реализующий базовый view.
 */
export default class BaseView extends BaseComponent {
    /**
     * Конструирует компонент. Обязательный параметр - функция отрисовки основного шаблона.
     * @constructor
     * @param {Element?} parent элемент, в который будет отрисован шаблон
     */
    constructor(parent) {
        super(parent);

        this._isActive = false;
    }

    /**
     * Метод, вызывающийся по умолчанию при открытии страницы.
     */
    _onShow() {
        throw new Error('View: метод _onShow должен быть реализован в подклассе');
    }

    /**
     * Метод, вызывающийся по умолчанию при обновлении страницы.
     */
    _onRefresh() {
        throw new Error('View: метод _onRefresh должен быть реализован в подклассе');
    }

    /**
     * Метод, вызывающийся по умолчанию при закрытии страницы.
     */
    _onHide() {
        this.removeEventListeners();

        this._isActive = false;
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {any} context контекст данных для страницы
     * @param {HandlebarsTemplateDelegate} templateName скомпилированный шаблон шаблона
     */
    render(context, templateName) {
        super.render(context, templateName);
        throw new Error('View: метод render должен быть реализован в подклассе');
    }
}
