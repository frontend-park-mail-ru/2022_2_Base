import '../templates.js';
import BaseComponent from '../BaseComponent.js';
import PopUpAddAddress from '../PopUpAddAddress/PopUpAddAddress.js';


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

        const PopUp = document.getElementById('popUp');
        const PopUpFade = document.getElementById('popUp-fade');
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

        const PopUp = document.getElementById('popUp');
        const PopUpFade = document.getElementById('popUp-fade');
        if (PopUp) {
            PopUp.style.display = 'block';
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'block';
        }
        this.PopUpAddAddress = new PopUpAddAddress(PopUp);
        this.PopUpAddAddress.render();
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
    startEventListener(addCard) {
        const deleteAddress = document.querySelectorAll('.delete-address');
        if (deleteAddress) {
            deleteAddress.forEach((key) => {
                key.addEventListener('click', (event) => this.listenClickDeleteAddress(event));
            });
        } else {
            console.log('element not found', deleteAddress);
        }

        const editAddress = document.querySelectorAll('.edit-address');
        if (editAddress) {
            editAddress.forEach((key) => {
                key.addEventListener('click', (event) => this.listenClickEditeAddress(event));
            });
        } else {
            console.log('element not found', editAddress);
        }

        if (addCard) {
            const newAddress = document.getElementById('add-address-card');
            if (newAddress) {
                newAddress.addEventListener('click', (event) => this.listenClickAddAddress(
                    event));
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
                address.removeEventListener('click', (event) => this.listenClickDeleteAddress(event));
            });
        }

        const editAddress = document.querySelectorAll('.edit-address');
        if (editAddress) {
            editAddress.forEach((key) => {
                key.removeEventListener('click', (event) => this.listenClickEditeAddress(event));
            });
        } else {
            console.log('element not found', editAddress);
        }

        const newAddress = document.getElementById('add-address-card');
        if (newAddress) {
            newAddress.addEventListener('click', (event) => this.listenClickAddAddress(
                event));
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
        super.render(context, 'addressCard.hbs');
        this.startEventListener(context.addCard);
    }
}
