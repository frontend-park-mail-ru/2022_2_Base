import BasePage from '../BasePage.js';
// import FormComponent from '../../components/Form/Form.js';
// import Req from '../../modules/ajax.js';
// import Val from '../../modules/validation.js';
import PaymentCard from '../../components/PaymentCard/PaymentCard.js';
import AddressCard from '../../components/AddressCard/AddressCard.js';
import PopUpEditUserInfo from '../../components/PopUpEditUserInfo/PopUpEditUserInfo.js';
import UserPageTemplate from './UserPage.hbs';
import './UserPage.scss';
import request from '../../modules/ajax';
import router from '../../modules/Router';

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
     * Функция, делающая запрос за картами пользователя и загружающая их
     * @param {object} componentEntity - экземпляр класса компонента
     * @param {string} nameOfCard - название карты
     * @param {string} apiPath - путь для запроса к серверу
     */
    async getCards(componentEntity, nameOfCard, apiPath) {
        const [status, outD] = await request.makeGetRequest(apiPath)
            .catch((err) => console.log(err));

        switch (status) {
        case 200:
            this.loadCards(componentEntity, nameOfCard, apiPath, outD);
            break;
        default:
            console.log('error', status);
        }
    }

    /**
     * Функция, подгружающая и отрисовывающая карты пользователя
     * @param {object} componentEntity - экземпляр класса компонента
     * @param {string} nameOfCard - название карты
     * @param {string} apiPath - путь для запроса к серверу
     * @param {object} data - данные для заполнения карт
     */
    async loadCards(componentEntity, nameOfCard, apiPath, data) {
        const cardCount = 1; // remove

        const temp = {};

        switch (nameOfCard) {
        case 'userDataCard':
            super.render({
                name: 'name',
                email: 'email',
                phone: 'phone',
                avatar: null,
            });
            return;
        case 'paymentCard':
            temp.item1 = {
                priority: true,
                number: '123456******1234',
                type: 'MIR',
                expiryDate: '00/00',
                id: `paymentCard/${String(1)}`,
            };
            temp.item2 = {
                number: '123456******1234',
                type: 'MIR',
                expiryDate: '00/00',
                id: `paymentCard/${String(2)}`,
            };
            break;
        case 'addressCard':
            temp.item1 = {
                priority: true,
                city: 'г. Москва',
                street: 'улица Бассейная',
                house: 'д. 228',
                id: `addressCard/${String(1)}`,
            };
            temp.item2 = {
                city: 'г. Москва',
                street: 'улица Бассейная',
                house: 'д. 228',
                id: `addressCard/${String(2)}`,
            };
            break;
        default:
            console.log('unknown command', nameOfCard);
        }
        if (cardCount < 4) {
            temp.addCard = {
                addCard: true,
                id: `${nameOfCard}/${String(cardCount)}`,
            };
        }
        componentEntity.render(temp);
    }

    /**
     * Функция для передачи в слушателе mouseover на фотографии пользователя.
     */
    async listenMouseOverProfile() {
        const PopUp = document.getElementById('change-user-photo_user-page');
        PopUp.style.display = 'flex';
    }

    /**
     * Функция для передачи в слушателе mouseout на фотографии пользователя.
     */
    async listenMouseOutProfile() {
        const PopUp = document.getElementById('change-user-photo_user-page');
        PopUp.style.display = 'none';
    }

    /**
     * Функция для передачи в слушателе mouseover на карточке банковской карты.
     * @param {object} event - событие, вызвавшее обработчик
     */
    async listenMouseOverPaymentCard(event) {
        const {id} = event.target;
        const PopUp = document
            .getElementById('change-payment-card' + id.replace('wrapper', ''));
        if (PopUp) {
            PopUp.style.display = 'flex';
        }
    }

    /**
     * Функция для передачи в слушателе mouseout на карточке банковской карты.
     * @param {object} event - событие, вызвавшее обработчик
     */
    async listenMouseOutPaymentCard(event) {
        // const PopUp = document.querySelector('.change-payment-card');
        const {id} = event.target;
        const PopUp = document
            .getElementById('change-payment-card' + id.replace('wrapper', ''));
        if (PopUp) {
            PopUp.style.display = 'none';
        }
    }

    /**
     * Функция для передачи в слушателе mouseover на карточке адреса.
     * @param {object} event - событие, вызвавшее обработчик
     */
    async listenMouseOverAddressCard(event) {
        const {id} = event.target;
        const PopUp = document
            .getElementById('change-address-card' + id.replace('wrapper', ''));
        if (PopUp) {
            PopUp.style.display = 'flex';
        }
    }

    /**
     * Функция для передачи в слушателе mouseout на карточке адреса.
     // * @param {object} event - событие, вызвавшее обработчик
     */
    async listenMouseOutAddressCard() {
        const {id} = event.target;
        const PopUp = document
            .getElementById('change-address-card' + id.replace('wrapper', ''));
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
     * @param {object} element - элемент DOM-дерева
     * @param {object} event - событие
     */
    async listenClickUserInfo(element, event) {
        event.preventDefault();

        const context = this.prepareRenderData(element);
        const PopUp = document.getElementById('popUp_user-page');
        const PopUpFade = document.getElementById('popUp-fade_user-page');
        if (PopUp) {
            PopUp.style.display = 'block';
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'block';
        }
        this.PopUpEditUserInfo = new PopUpEditUserInfo(PopUp);
        this.PopUpEditUserInfo.render(context);
    }

    /*
        /!**
         * Функция для передачи в слушатель mouseOver или mouseOut.
         * @param {string} id элемента для изменения display
         * @param {string} display - none или grid
         *!/
        async listenMouse(id, display) {
            const PopUp = document.getElementById(id);
            if (PopUp) {
                PopUp.style.display = display;
            }
        }

            /!**
             * Функция для передачи в слушатель mouseOver или mouseOut.
             * @param {string} elementToListen - элемента для передачи в EventListener
             * @param {string} elementToChange - элемента для изменения display
             *!/
            startListen(elementToListen, elementToChange) {
                const element = document.querySelector(elementToListen);
                if (element) {
                    this.Listners.append(this.listenMouse.bind(this, elementToChange, 'grid'));
                    this.Listners.append(this.listenMouse.bind(this, elementToChange, 'none'));
                    element.addEventListener('mouseover', this.Listners[this.Listners.length - 2]);
                    element.addEventListener('mouseout', this.Listners[this.Listners.length - 1]);
                } else {
                    console.log('element not found', element);
                }
            };*/

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        /*        this.Listners = [];
                this.startListen('.user-photo-block', 'change-user-photo');
                this.startListen('.payment-card-wrapper', '.change-payment-card');
                this.startListen('.address-card-wrapper', '.change-address-card');
                this.startListen('.edit-profile-data', 'change-user-photo');*/

        const Profile = document.getElementById('user-photo-block');
        if (Profile) {
            Profile.addEventListener('mouseenter', this.listenMouseOverProfile);
            Profile.addEventListener('mouseleave', this.listenMouseOutProfile);
        } else {
            console.log('element not found', Profile);
        }

        // const PaymentCards = document.getElementById('bank-card_user-page__main');
        const PaymentCard = document.querySelectorAll('.payment-card-wrapper');
        if (PaymentCard) {
            PaymentCard.forEach((paymentCard) => {
                paymentCard.addEventListener('mouseenter', this.listenMouseOverPaymentCard);
                paymentCard.addEventListener('mouseleave', this.listenMouseOutPaymentCard);
            });
        } else {
            console.log('element not found', PaymentCard);
        }

        // const AddressCards = document.getElementById('address-card_user-page__main');
        const AddressCard = document.querySelectorAll('.address-card-wrapper');
        if (AddressCard) {
            AddressCard.forEach((addressCard) => {
                addressCard.addEventListener('mouseenter', this.listenMouseOverAddressCard);
                addressCard.addEventListener('mouseleave', this.listenMouseOutAddressCard);
            });
        } else {
            console.log('element not found', AddressCard);
        }

        const userInfo = document.querySelectorAll('.edit-profile-data');
        if (userInfo) {
            userInfo.forEach((key) => {
                // fix
                key.addEventListener('click', this.listenClickUserInfo.bind(this, key.parentNode));
            });
        } else {
            console.log('element not found', userInfo);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        /*        for (let i = 0; i < this.Listners.length; ++i) {
                    const Profile = document.querySelector('.user-photo-block');
                    if (Profile) {
                        Profile.removeEventListener('mouseover', this.listenMouseOverProfile);
                        Profile.removeEventListener('mouseout', this.listenMouseOutProfile);
                    }
                }*/


        const Profile = document.getElementById('user-photo-block');
        if (Profile) {
            Profile.removeEventListener('mouseover', this.listenMouseOverProfile);
            Profile.removeEventListener('mouseleave', this.listenMouseOutProfile);
        }

        const PaymentCard = document.querySelectorAll('.payment-card');
        if (PaymentCard) {
            PaymentCard.forEach((key) => {
                key.removeEventListener('mouseenter', this.listenMouseOverPaymentCard);
                key.removeEventListener('mouseleave', this.listenMouseOutPaymentCard);
            });
        }

        const AddressCard = document.querySelectorAll('.address-card-wrapper');
        if (AddressCard) {
            AddressCard.forEach((key) => {
                key.removeEventListener('mouseenter', this.listenMouseOverAddressCard);
                key.removeEventListener('mouseleave', this.listenMouseOutAddressCard);
            });
        }

        const userInfo = document.querySelectorAll('.edit-profile-data');
        if (userInfo) {
            userInfo.forEach((key) => {
                key.removeEventListener('click', this.listenClickUserInfo);
            });
        }
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    async render(config) {
        await this.loadCards(null, 'userDataCard', config.api.profile);

        await this.loadCards(new PaymentCard(
            document.getElementById('payment-cards-items_user-page')),
        'paymentCard', config.api.profile);
        await this.loadCards(new AddressCard(
            document.getElementById('address-cards_user-page-items')),
        'addressCard', config.api.profile);

        this.startEventListener();
    }
}
