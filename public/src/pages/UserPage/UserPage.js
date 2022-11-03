import '../templates.js';
import BasePage from '../BasePage.js';
// import FormComponent from '../../components/Form/Form.js';
// import Req from '../../modules/ajax.js';
// import Val from '../../modules/validation.js';
import PaymentCard from '../../components/PaymentCard/PaymentCard.js';
import AddressCard from '../../components/AddressCard/AddressCard.js';
import PopUpEditUserInfo from '../../components/PopUpEditUserInfo/PopUpEditUserInfo.js';

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
            window.Handlebars.templates['UserPage.hbs'],
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
            const paymentCard = {
                addCard: true,
            };

            paymentCard.id = `paymentCard${String(1)}`;
            paymentCard.index = 1;
            this.paymentCard = new PaymentCard(document.getElementById('payment-cards-items'));
            this.paymentCard.render(paymentCard);
        }

        const paymentCard = {
            priority: true,
            number: '123456******1234',
            type: 'MIR',
            expiryDate: '00/00',
            addCard: false,
        };

        paymentCard.id = `addressCard${String(cardCount + 1)}`;
        paymentCard.index = cardCount + 1;


        this.paymentCard = new PaymentCard(document.getElementById('payment-cards-items'));
        console.log(this.paymentCard.id);

        this.paymentCard.render(paymentCard);
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
            const addressCard = {
                addCard: true,
            };

            addressCard.id = `addressCard${String(cardCount + 1)}`;
            addressCard.index = cardCount + 1;

            this.addressCard = new AddressCard(document.getElementById('address-cards-items'));
            this.addressCard.render(addressCard);
        }

        const addressCard = {
            priority: false,
            city: 'г. Москва',
            street: 'улица Бассейная',
            house: 'д. 228',
            addCard: false,
        };

        addressCard.id = `addressCard${String(1)}`;
        addressCard.index = 1;

        this.addressCard = new AddressCard(document.getElementById('address-cards-items'));
        this.addressCard.render(addressCard);
    }

    /**
     * Функция для передачи в слушателе mouseover на фотографии пользователя.
     */
    async listenMouseOverProfile() {
        const PopUp = document.querySelector('.change-user-photo');
        PopUp.style.display = 'grid';

        const Photo = document.querySelector('.user-photo');
        Photo.style.filter = 'blur(4px)';
    }

    /**
     * Функция для передачи в слушателе mouseout на фотографии пользователя.
     */
    async listenMouseOutProfile() {
        const PopUp = document.querySelector('.change-user-photo');
        PopUp.style.display = 'none';

        const Photo = document.querySelector('.user-photo');
        Photo.style.filter = 'none';
    }

    /**
     * Функция для передачи в слушателе mouseover на карточке банковской карты.
     */
    async listenMouseOverPaymentCard() {
        const PopUp = document.querySelector('.change-payment-card');
        if (PopUp) {
            PopUp.style.display = 'grid';
        }

        const PaymentCard = document.querySelector('.payment-card');
        if (PaymentCard) {
            PaymentCard.style.filter = 'blur(4px)';
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
        // PopUp.style.display = 'none';

        const PaymentCard = document.querySelector('.payment-card');
        if (PaymentCard) {
            PaymentCard.style.filter = 'none';
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

        const AddressCard = document.querySelector('.address-card');
        if (AddressCard) {
            AddressCard.style.filter = 'blur(4px)';
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

        const AddressCard = document.querySelector('.address-card');
        if (AddressCard) {
            AddressCard.style.filter = 'none';
        }
    }

    /**
     * Функция для передачи в слушателе click на значок редактирования
     * данных пользователя
     * @param {object} event - событие
     */
    async listenClickUserInfo(event) {
        event.preventDefault();

        const context = { // fix
            title: 'Имя',
            fields: {
                name: {
                    name: 'Имя',
                    value: 'Пирожок',
                },
                sername: {
                    name: 'Имя',
                    value: 'Пирожок',
                },
            },
        };
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

        const userInfo = document.querySelectorAll('.edit');
        if (userInfo) {
            userInfo.forEach((key) => {
                key.addEventListener('click', this.listenClickUserInfo);
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
        const context = config.header.user;
        context.userInfo = config.userInfo;
        super.render(context);

        await this.loadPaymentCards();
        await this.loadAddressCards();

        this.startEventListener();
    }
}
