import BasePage from '../BasePage.js';
// import FormComponent from '../../components/Form/Form.js';
// import Req from '../../modules/ajax.js';
// import Val from '../../modules/validation.js';
import PaymentCard from '../../components/PaymentCard/PaymentCard.js';
import AddressCard from '../../components/AddressCard/AddressCard.js';
import PopUpEditUserInfo from '../../components/PopUpEditUserInfo/PopUpEditUserInfo.js';
import UserPageTemplate from './UserPage.hbs';
import './UserPage.scss';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class UserPage extends BasePage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            UserPageTemplate,
        );
    }

    /**
     * Функция, подгружающая и отрисовывающая банковские карты пользователя
     */
    async loadPaymentCards() {
        const cardCount = 1; // изначально 0
        /* Тут должен быть запрос и получение количества карт */

        /*
         * Проверка, нужно ли отрисовывать карточку добавления или максимальное количество карт уже
         * достигнуто. Если предел не достигнут, отрисовка карточки добавления
         */
        if (cardCount < 4) {
            this.paymentCards = new PaymentCard(
                document.getElementById('payment-cards-items_user-page'));
            this.paymentCards.render({
                addCard: true,
                id: `paymentCard${String(1)}`,
                index: 1,
            });
        }
        this.paymentCard = new PaymentCard(document.getElementById('payment-cards-items_user-page'));
        this.paymentCard.render({
            priority: true,
            number: '123456******1234',
            type: 'MIR',
            expiryDate: '00/00',
            addCard: false,
            id: `addressCard${String(cardCount + 1)}`,
            index: cardCount + 1,
        });
    }

    /**
     * Функция, подгружающая и отрисовывающая адреса пользователя
     */
    async loadAddressCards() {
        const cardCount = 1;
        /* Тут должен быть запрос и получение количества карт */

        /**
         * Проверка, нужно ли отрисовывать карточку добавления или максимальное количество карт уже
         * достигнуто. Если предел не достигнут, отрисовка карточки добавления.
         */
        if (cardCount < 4) {
            this.addressCard = new AddressCard(document.getElementById('address-cards_user-page-items'));
            this.addressCard.render({
                addCard: true,
                id: `addressCard${String(cardCount + 1)}`,
                index: cardCount + 1,
            });
        }
        this.addressCard = new AddressCard(document.getElementById('address-cards_user-page-items'));
        this.addressCard.render({
            priority: false,
            city: 'г. Москва',
            street: 'улица Бассейная',
            house: 'д. 228',
            addCard: false,
            id: `addressCard${String(1)}`,
            index: 1,
        });
    }

    /**
     * Функция для передачи в слушателе mouseover на фотографии пользователя.
     */
    async listenMouseOverProfile() {
        const PopUp = document.getElementById('change-user-photo');
        PopUp.style.display = 'grid';
    }

    /**
     * Функция для передачи в слушателе mouseout на фотографии пользователя.
     */
    async listenMouseOutProfile() {
        const PopUp = document.querySelector('.change-user-photo');
        PopUp.style.display = 'none';
    }

    /**
     * Функция для передачи в слушателе mouseover на карточке банковской карты.
     */
    async listenMouseOverPaymentCard() {
        const PopUp = document.querySelector('.change-payment-card');
        if (PopUp) {
            PopUp.style.display = 'grid';
        }
    }

    /**
     * Функция для передачи в слушателе mouseout на карточке банковской карты.
     */
    async listenMouseOutPaymentCard() {
        const PopUp = document.querySelector('.change-payment-card');
        if (PopUp) {
            PopUp.style.display = 'none';
        }
    }

    /**
     * Функция для передачи в слушателе mouseover на карточке адреса.
     */
    async listenMouseOverAddressCard() {
        const PopUp = document.querySelector('.change-address-card');
        if (PopUp) {
            PopUp.style.display = 'grid';
        }
    }

    /**
     * Функция для передачи в слушателе mouseout на карточке адреса.
     */
    async listenMouseOutAddressCard() {
        const PopUp = document.querySelector('.change-address-card');
        if (PopUp) {
            PopUp.style.display = 'none';
        }
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
     * @param {object} element - элемент DOM-дерева
     */
    async listenClickUserInfo(event, element) {
        event.preventDefault();

        const context = this.prepareRenderData(element);
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
        const Profile = document.querySelector('.user-photo-block');
        if (Profile) {
            Profile.addEventListener('mouseover', this.listenMouseOverProfile);
            Profile.addEventListener('mouseout', this.listenMouseOutProfile);
        } else {
            console.log('element not found', Profile);
        }

        const PaymentCard = document.querySelector('.payment-card-wrapper');
        if (PaymentCard) {
            PaymentCard.addEventListener('mouseover', this.listenMouseOverPaymentCard);
            PaymentCard.addEventListener('mouseout', this.listenMouseOutPaymentCard);
        } else {
            console.log('element not found', PaymentCard);
        }

        const AddressCard = document.querySelector('.address-card-wrapper');
        if (AddressCard) {
            AddressCard.addEventListener('mouseover', this.listenMouseOverAddressCard);
            AddressCard.addEventListener('mouseout', this.listenMouseOutAddressCard);
        } else {
            console.log('element not found', AddressCard);
        }

        const userInfo = document.querySelectorAll('.edit-profile-data');
        if (userInfo) {
            userInfo.forEach((key) => {
                key.addEventListener('click', (event) => this.listenClickUserInfo(
                    event, key.parentNode));
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
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    async render(config) {
        config.userInfo.userCard.name = 'Имя Фамилия';
        config.userInfo.userCard.email = 'email@domain.ru';
        config.userInfo.userCard.phone = '7 777 777 77 77';

        const context = config.header.user;
        context.userInfo = config.userInfo;
        super.render(context);

        await this.loadPaymentCards();
        await this.loadAddressCards();

        // this.startEventListener();
    }
}
