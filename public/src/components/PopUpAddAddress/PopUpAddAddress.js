import BaseComponent from '../BaseComponent.js';
import PopUpAddAddressTemplate from './PopUpAddAddress.hbs';
import './PopUpAddAddress.scss';
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
        const inputData = {
            city: document.getElementById('city').value,
            street: document.getElementById('street').value,
            house: document.getElementById('house').value,
            flat: document.getElementById('flat').value,
            // id: this.context.id,
        };

        if (this.context.add) {
            profileAction.saveAddAddress(inputData);
        } else {
            profileAction.saveEditAddress(inputData);
        }
        // const PopUp = document.getElementById('popUp_user-page');
        // const PopUpFade = document.getElementById('popUp-fade_user-page');
        // if (PopUp) {
        //     PopUp.style.display = 'none';
        //     PopUp.replaceChildren();
        // }
        // if (PopUpFade) {
        //     PopUpFade.style.display = 'none';
        // }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        const cancel = document.getElementById('popup-form_add-address__cancel');
        cancel.addEventListener('click', this.listenClickCancel);

        const apply = document.getElementById('popup-form_add-address__apply');
        this.listenClickApplyBind = this.listenClickApply.bind(this);
        apply.addEventListener('click', this.listenClickApplyBind);
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const cancel = document.getElementById('.popup-form_add-address__cancel');
        cancel.removeEventListener('click', this.listenClickCancel);

        const apply = document.getElementById('.popup-form_add-address__apply');
        apply.removeEventListener('click', this.listenClickApplyBind);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {object} context, с учетом которого будет произведен рендер
     */
    render(context) {
        this.context = context;
        super.render(context, PopUpAddAddressTemplate);
        this.startEventListener();
    }
}
