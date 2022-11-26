import BaseComponent from '../BaseComponent';
import PopUpAddPaymentCardTemplate from './PopUpAddPaymentCard.hbs';
import './PopUpAddPaymentCard.scss';
import {profileAction} from '../../actions/profile';

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
        profileAction.saveAddCard({
            number: document.getElementById('cardNumber').value,
            expiry: document.getElementById('month').value + '/' +
                document.getElementById('year').value,
            cvc: document.getElementById('cvc').value,
        });
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        const cancel = document.getElementById('popup-form_add-card__cancel');
        cancel.addEventListener('click', this.listenClickCancel);

        const apply = document.getElementById('popup-form_add-card__apply');
        apply.addEventListener('click', this.listenClickApply);
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const cancel = document.getElementById('.popup-form_add-card__cancel');
        cancel.removeEventListener('click', this.listenClickCancel);

        const apply = document.getElementById('.popup-form_add-card__apply');
        apply.removeEventListener('click', this.listenClickApply);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     */
    render() {
        super.render(null, PopUpAddPaymentCardTemplate);
        this.startEventListener();
    }
}
