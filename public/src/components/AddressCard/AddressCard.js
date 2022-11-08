import BaseComponent from '../BaseComponent.js';
import PopUpAddAddress from '../PopUpAddAddress/PopUpAddAddress.js';
import AddressCardTemplate from './addressCard.hbs';
import './AddressCard.scss';

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
     * Функция для передачи в слушателе click на значок редактирования
     * адреса
     * @param {object} event - событие
     */
    async listenClickEditeAddress(event) {
        event.preventDefault();

        // Запрос данных адреса
        const address = {
            country: 'Россия',
            city: 'Москва',
            street: 'Бассейная',
            house: 228,
            flat: 5,
        };

        const PopUp = document.getElementById('popUp_user-page');
        const PopUpFade = document.getElementById('popUp-fade_user-page');
        if (PopUp) {
            PopUp.style.display = 'block';
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'block';
        }
        this.PopUpAddAddress = new PopUpAddAddress(PopUp);
        this.PopUpAddAddress.render(address);
    }

    /**
     * Функция для передачи в слушателе click на значок добавления
     * адреса
     * @param {object} event - событие
     */
    async listenClickAddAddress(event) {
        event.preventDefault();

        const PopUp = document.getElementById('popUp_user-page');
        const PopUpFade = document.getElementById('popUp-fade_user-page');
        if (PopUp) {
            PopUp.style.display = 'block';
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'block';
        }
        this.PopUpAddAddress = new PopUpAddAddress(PopUp);
        this.PopUpAddAddress.render(null);
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
     * @param {boolean} addCard - контекст для навешивания обработчиков
     */
    startEventListener({addCard}) {
        const deleteAddress = document.querySelectorAll('.delete-address');
        if (deleteAddress) {
            deleteAddress.forEach((key) => {
                key.addEventListener('click', this.listenClickDeleteAddress);
            });
        } else {
            console.log('element not found', deleteAddress);
        }

        const editAddress = document.querySelectorAll('.edit-address');
        if (editAddress) {
            editAddress.forEach((key) => {
                key.addEventListener('click', this.listenClickEditeAddress);
            });
        } else {
            console.log('element not found', editAddress);
        }

        if (addCard) {
            const newAddress = document.getElementById('add-address-card');
            if (newAddress) {
                newAddress.addEventListener('click', this.listenClickAddAddress);
            } else {
                console.log('element not found', newAddress);
            }
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const address = document.querySelectorAll('.delete-address');
        if (address) {
            address.forEach((key) => {
                address.removeEventListener('click', this.listenClickDeleteAddress);
            });
        }

        const editAddress = document.querySelectorAll('.edit-address');
        if (editAddress) {
            editAddress.forEach((key) => {
                key.removeEventListener('click', this.listenClickEditeAddress);
            });
        } else {
            console.log('element not found', editAddress);
        }

        const newAddress = document.getElementById('add-address-card');
        if (newAddress) {
            newAddress.addEventListener('click', this.listenClickAddAddress);
        } else {
            console.log('element not found', newAddress);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {context} context, с учетом которого будет произведен рендер
     */
    render(context) {
        super.render(super.prepareCategory(context), AddressCardTemplate);
        this.startEventListener(context); // context.addCard
    }
}
