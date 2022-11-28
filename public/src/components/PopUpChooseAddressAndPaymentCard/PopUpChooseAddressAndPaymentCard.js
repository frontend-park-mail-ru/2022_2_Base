<<<<<<< HEAD
import BaseComponent from '../BaseComponent.js';
=======
import BaseComponent from '../BaseComponent';
>>>>>>> main
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
     * Функция для передачи в слушателе click на выбор новых данных.
<<<<<<< HEAD
     * @param {number} id - id элемента
=======
     * @param {string} id - id элемента
>>>>>>> main
     */
    async listenClickAddressAndPaymentCard(id) {
        const chooseAddress = document.getElementById(id);
        if (chooseAddress) {
            const fields = document.querySelectorAll('.cart-popup-form__input');
            if (fields) {
                fields.forEach((key) => {
                    key.style.border = '1px solid #d5d5d5';
                    if (key.classList.contains('choice')) {
                        key.classList.remove('choice');
                    }
                });
            }
            chooseAddress.style.border = '1px solid #6369D1';
            chooseAddress.classList.add('choice');
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
<<<<<<< HEAD
        const cancel = document.getElementById('cart-popup-form__cancel');
        cancel.addEventListener('click', this.listenClickCancel);

        const fields = document.querySelectorAll('.cart-popup-form__input');
        if (fields) {
            fields.forEach((key) => {
                const fieldId = key.getAttribute('id');
                key.addEventListener('click', this.listenClickAddressAndPaymentCard.bind(null, fieldId));
=======
        this.cancelElement = document.getElementById('cart-popup-form__cancel');
        this.cancelElement.addEventListener('click', this.listenClickCancel);

        this.popUpFields = document.querySelectorAll('.cart-popup-form__input');
        if (this.popUpFields) {
            this.bindListenClickAddressAndPaymentCard = [];
            this.popUpFields.forEach((key, i) => {
                this.bindListenClickAddressAndPaymentCard.push(
                    this.listenClickAddressAndPaymentCard.bind(null, key.id));
                key.addEventListener('click', this.bindListenClickAddressAndPaymentCard[i]);
>>>>>>> main
            });
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
<<<<<<< HEAD
        const cancel = document.getElementById('.cart-popup-form__cancel');
        cancel.removeEventListener('click', this.listenClickCancel);

        const fields = document.querySelectorAll('.cart-popup-form__input');
        if (fields) {
            fields.forEach((key) => {
                const fieldId = key.getAttribute('id');
                key.removeEventListener('click',
                    this.listenClickAddressAndPaymentCard.bind(null, fieldId));
=======
        this.cancelElement.removeEventListener('click', this.listenClickCancel);

        if (this.popUpFields) {
            this.popUpFields.forEach((key, i) => {
                key.removeEventListener('click',
                    this.bindListenClickAddressAndPaymentCard[i]);
>>>>>>> main
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
