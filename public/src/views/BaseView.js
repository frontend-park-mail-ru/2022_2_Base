// Базовый компонент
import BaseComponent from '../components/BaseComponent.js';

// Компоненты по умолчанию
// import HeaderComponent from '../components/Header/Header.js';
// import FooterComponent from '../components/Footer/Footer.js';

/**
 * Класс, реализующий базовый view.
 */
export default class BaseView extends BaseComponent {
    /**
     * Конструирует компонент. Обязательный параметр - функция отрисовки основного шаблона.
     * @constructor
     * @param {Object} context контекст отрисовки шаблона
     * @param {Function} template функция отрисовки шаблона
     * @param {Element?} parent элемент, в который будет отрисован шаблон
     */
    constructor(context, template, parent) {
        super(context, template, parent);

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
     * Метод для отрисовки элемента.
     */
    render() {
        throw new Error('View: метод render должен быть реализован в подклассе');
    }
}
