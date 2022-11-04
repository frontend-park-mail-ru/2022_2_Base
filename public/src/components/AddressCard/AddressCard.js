import '../templates.js';
import BaseComponent from '../BaseComponent.js';

/**
 * Класс для реализации компонента Footer
 */
export default class AddressCard extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента AddressCard
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);
    }

    /**
     * Функция для передачи в слушателе click на значок удаления
     * адреса
     * @param {object} event - событие
     */
     async listenClickDeleteAddress(event) {
        event.preventDefault();

        /*  Вызов метода, для удаления адреса */
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        const address = document.querySelectorAll('.delete-address');
        if (address) {
            address.forEach((key) => {
                key.addEventListener('click', (event) => this.listenClickDeleteAddress(event));
            });
        } else {
            console.log('element not found', address);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const address = document.querySelectorAll('.delete-address');
        if (address) {
            address.forEach((key) => {
                address.removeEventListener('click', (event) => this.listenClickDeleteAddress(event));
            });
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {context} context, с учетом которого будет произведен рендер
     */
    render(context) {
        super.render(context, 'addressCard.hbs');
        this.startEventListener();
    }
}
