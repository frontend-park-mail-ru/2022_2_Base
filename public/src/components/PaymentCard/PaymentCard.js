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
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} наполнение для формы
     */
     prepareRenderData(context) {
        const data = {
            title: context.getAttribute('name'),
            fields: {
                field1: {
                    name: context.getAttribute('name'),
                    value: context.getAttribute('value'),
                },
            },
        };
        if (context.getAttribute('id') === 'email') {
            data.title = 'Почту';
        }
        if (context.getAttribute('id') === 'password') {
            // data.fields.field1.name = 'Старый пароль';
            // data.fields.field1.value = ''

            // data.fields.field2 = {};
            data.fields.field1.name = 'Новый пароль';
            data.fields.field1.value = context.getAttribute('value');

            data.fields.field2 = {};
            data.fields.field2.name = 'Повторить пароль';
            data.fields.field2.value = '';
        }
        return data;
    }

    /**
     * Функция для передачи в слушателе click на значок редактирования
     * данных пользователя
     * @param {object} event - событие
     */
    async listenClickUserInfo(event, element) {
        event.preventDefault();

        const context = this.prepareRenderData(element);
        console.log(context)
        const PopUp = document.getElementById('popUp');
        const PopUpFade = document.getElementById('popUp-fade');
        if (PopUp) {
            PopUp.style.display = 'block';
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'block';
        }
        this.PopUpEditUserInfo = new PopUpEditUserInfo(PopUp);
        this.PopUpEditUserInfo.render(context);
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        const editPaymentCard = document.querySelectorAll('.edit-payment-card');

        if (editPaymentCard) {
            editPaymentCard.forEach((key) => {
                key.addEventListener('click', event => this.listenClickUserInfo(event, key.parentNode));
            });
        } else {
            console.log('element not found', userInfo);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const Profile = document.querySelector('.user-photo-block');
        if (Profile) {
            Profile.removeEventListener('mouseover', this.listenMouseOverProfile);
            Profile.removeEventListener('mouseout', this.listenMouseOutProfile);
        }

        const PaymentCard = document.querySelector('.payment-card');
        if (PaymentCard) {
            PaymentCard.removeEventListener('mouseover', this.listenMouseOverPaymentCard);
            PaymentCard.removeEventListener('mouseout', this.listenMouseOutPaymentCard);
        }

        const AddressCard = document.querySelector('.address-card-wrapper');
        if (AddressCard) {
            AddressCard.removeEventListener('mouseover', this.listenMouseOverAddressCard);
            AddressCard.removeEventListener('mouseout', this.listenMouseOutAddressCard);
        }

        const userInfo = document.querySelectorAll('.edit');
        if (userInfo) {
            userInfo.forEach((key) => {
                userInfo.removeEventListener('click', this.listenClickUserInfo);
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
