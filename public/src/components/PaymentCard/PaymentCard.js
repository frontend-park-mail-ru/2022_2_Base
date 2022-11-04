import '../templates.js';
import BaseComponent from '../BaseComponent.js';

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
     */
    startEventListener() {
        const paymentCard = document.querySelectorAll('.delete-payment-card');
        if (paymentCard) {
            paymentCard.forEach((key) => {
                key.addEventListener('click', (event) => this.listenClickDeletePaymentCard(event));
            });
        } else {
            console.log('element not found', paymentCard);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const paymentCard = document.querySelectorAll('.delete-payment-card');
        if (paymentCard) {
            paymentCard.forEach((key) => {
                paymentCard.removeEventListener('click', this.listenClickDeletePaymentCard());
            });
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {context} context, с учетом которого будет произведен рендер
     */
    render(context) {
        super.render(context, 'paymentCard.hbs');
        this.startEventListener();
    }
}
