import BaseComponent from '../BaseComponent.js';
import PopUpAddAddressTemplate from './PopUpAddAddress.hbs';
import './PopUpAddAddress.scss';

/**
 * Класс для реализации компонента Footer
 */
export default class PopUpAddPaymentCard extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента PopUpAddPaymentCard
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);
    }

    /**
     * Функция для передачи в слушателе click на отмену изменений данных.
     * @param {object} event - событие
     */
    async listenClickCancel(event) {
        event.preventDefault();

        const PopUp = document.getElementById('popUp_user-page');
        const PopUpFade = document.getElementById('popUp-fade_user-page');
        if (PopUp) {
            PopUp.style.display = 'none';
            PopUp.replaceChildren();
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'none';
        }
    }

    /**
     * Функция для передачи в слушателе click на сохранение новых данных.
     * @param {object} event - событие
     */
    async listenClickApply(event) {
        event.preventDefault();

        const PopUp = document.getElementById('popUp_user-page');
        const PopUpFade = document.getElementById('popUp-fade_user-page');
        if (PopUp) {
            PopUp.style.display = 'none';
            PopUp.replaceChildren();
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'none';
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        const cancel = document.getElementById('popup-form_add-address__cancel');
        cancel.addEventListener('click', this.listenClickCancel);

        const apply = document.getElementById('popup-form_add-address__apply');
        apply.addEventListener('click', this.listenClickApply);
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const cancel = document.getElementById('.popup-form_add-address__cancel');
        cancel.removeEventListener('click', this.listenClickCancel);

        const apply = document.getElementById('.popup-form_add-address__apply');
        apply.removeEventListener('click', this.listenClickApply);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {object} context, с учетом которого будет произведен рендер
     */
    render(context) {
        super.render(context, PopUpAddAddressTemplate);
        this.startEventListener();
    }
}
