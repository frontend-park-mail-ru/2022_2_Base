import BaseComponent from '../BaseComponent.js';
import PopUpAddPaymentCard from '../PopUpAddPaymentCard/PopUpAddPaymentCard.js';
import PaymentCardTemplate from './paymentCard.hbs';
import './PaymentCard.scss';

/**
 * Класс для реализации компонента PaymentCard
 */
export default class PaymentCard extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента PaymentCard
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);
    }

    /**
     * Функция для передачи в слушателе click на значок добавления
     * банковской карты
     * @param {object} event - событие
     */
    async listenClickAddPaymentCard(event) {
        event.preventDefault();

        const PopUp = document.getElementById('popUp');
        const PopUpFade = document.getElementById('popUp-fade');
        if (PopUp) {
            PopUp.style.display = 'block';
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'block';
        }
        this.popUpAddPaymentCard = new PopUpAddPaymentCard(PopUp);
        this.popUpAddPaymentCard.render();
    }

    /**
     * Функция для передачи в слушателе click на значок удаления
     * банковской карты
     * @param {object} event - событие
     */
    async listenClickDeletePaymentCard(event) {
        event.preventDefault();

        /*  Вызов метода, для удаления карты */
    }

    /**
     * Метод, добавляющий слушатели.
     * @param {object} context - контекст для навешивания обработчиков
     */
    startEventListener(context) {
        const paymentCard = document.querySelectorAll('.delete-payment-card');
        if (paymentCard) {
            paymentCard.forEach((key) => {
                key.addEventListener('click', this.listenClickDeletePaymentCard);
            });
        } else {
            console.log('element not found', paymentCard);
        }

        if (context.addCard) {
            const newPaymentCard = document.getElementById('add-payment-card');
            if (newPaymentCard) {
                newPaymentCard.addEventListener('click', this.listenClickAddPaymentCard);
            } else {
                console.log('element not found', newPaymentCard);
            }
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const paymentCard = document.querySelectorAll('.delete-payment-card');
        if (paymentCard) {
            paymentCard.forEach((key) => {
                paymentCard.removeEventListener('click', this.listenClickDeletePaymentCard);
            });
        }

        const newPaymentCard = document.getElementById('add-payment-card');
        if (newPaymentCard) {
            newPaymentCard.removeEventListener('click', this.listenClickAddPaymentCard);
        } else {
            console.log('element not found', newPaymentCard);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {context} context, с учетом которого будет произведен рендер
     */
    render(context) {
        super.render(super.prepareCategory(context), PaymentCardTemplate);
        console.log(context);
        this.startEventListener(context);
    }
}
