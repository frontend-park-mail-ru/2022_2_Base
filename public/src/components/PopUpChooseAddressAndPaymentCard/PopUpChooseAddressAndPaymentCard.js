// import { K } from 'handlebars';
import BaseComponent from '../BaseComponent.js';
import PopUpChooseAddressAndPaymentCard from './PopUpChooseAddressAndPaymentCard.hbs';
import './PopUpChooseAddressAndPaymentCard.scss';

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

        const PopUp = document.getElementById('popUp');
        const PopUpFade = document.getElementById('popUp-fade');
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
     */
    async listenClickApply() {
        const PopUp = document.getElementById('popUp');
        const PopUpFade = document.getElementById('popUp-fade');
        if (PopUp) {
            PopUp.style.display = 'none';
            PopUp.replaceChildren();
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'none';
        }

        // Сохранить данные
    }

    /**
     * Функция для передачи в слушателе click на выбор новых данных.
     * @param {number} id - id элемента
     */
    async listenClickAddressAndPaymentCard(id) {
        const chooseAddress = document.getElementById(id);
        if (chooseAddress) {
            const fields = document.querySelectorAll('.cart-popup-form__input');
            if (fields) {
                fields.forEach((key) => {
                    key.style.border = '1px solid #d5d5d5';
                });
            }
            chooseAddress.style.border = '1px solid #6369D1';
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        const cancel = document.getElementById('cart-popup-form__cancel');
        cancel.addEventListener('click', this.listenClickCancel);

        const apply = document.getElementById('cart-popup-form__apply');
        apply.addEventListener('click', this.listenClickApply);

        const fields = document.querySelectorAll('.cart-popup-form__input');
        if (fields) {
            fields.forEach((key) => {
                const fieldId = key.getAttribute('id');
                key.addEventListener('click', this.listenClickAddressAndPaymentCard.bind(null, fieldId));
            });
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const cancel = document.getElementById('.cart-popup-form__cancel');
        cancel.removeEventListener('click', this.listenClickCancel);

        const apply = document.getElementById('.cart-popup-form__apply');
        apply.removeEventListener('click', this.listenClickApply);

        const fields = document.querySelectorAll('.cart-popup-form__input');
        if (fields) {
            fields.forEach((key) => {
                const fieldId = key.getAttribute('id');
                key.removeEventListener('click',
                    this.listenClickAddressAndPaymentCard.bind(null, fieldId));
            });
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {Object} context контекст отрисовки шаблона
     */
    render(context) {
        super.render(context, PopUpChooseAddressAndPaymentCard);
        this.startEventListener();
    }
}
