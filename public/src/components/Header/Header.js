import '../templates.js';
import BaseComponent from '../BaseComponent.js';

/**
 * Класс для реализации компонента Header
 */
export default class Header extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента Header
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);
    }

    /**
     * Функция для передачи в слушателе mouseover.
     */
    async listenMouseOverProfile() {
        const headerPopUp = document.querySelector('.profile__pop-up');
        headerPopUp.style.display = 'block';
    }

    /**
     * Функция для передачи в слушателе mouseout.
     */
    async listenMouseOutProfile() {
        const headerPopUp = document.querySelector('.profile__pop-up');
        headerPopUp.style.display = 'none';
    }

    /**
     * Метод, добавляющий слушатели.
     * @param {any} session контекст данных для компонента
     */
    startEventListener(session) {
        if (session) {
            const headerProfile = document.querySelector('.header__profile');
            headerProfile.addEventListener('mouseover', this.listenMouseOverProfile);
            headerProfile.addEventListener('mouseout', this.listenMouseOutProfile);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     * @param {any} session контекст данных для компонента
     */
    stopEventListener(session) {
        if (!session) {
            const headerProfile = document.querySelector('.header__profile');
            headerProfile.removeEventListener('mouseover', this.listenMouseOverProfile);
            headerProfile.removeEventListener('mouseout', this.listenMouseOutProfile);
        }
    }


    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {Boolean} sessionValue контекст отрисовки шаблона, содержащий информацию об авторизации
     */
    render(sessionValue) {
        const session = {session: sessionValue};
        this._parent.insertAdjacentHTML('afterbegin',
            window.Handlebars.templates['header.hbs'](session));
        this.startEventListener(session);
    }
}
