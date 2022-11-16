import BasePage from '../BasePage.js';
import PaymentCard from '../../components/PaymentCard/PaymentCard.js';
import AddressCard from '../../components/AddressCard/AddressCard.js';
import PopUpEditUserInfo from '../../components/PopUpEditUserInfo/PopUpEditUserInfo.js';
import UserPageTemplate from './UserPage.hbs';
import './UserPage.scss';
import {profileAction, ProfileActionTypes} from '../../actions/profile.js';
import userStore from '../../stores/UserStrore.js';
import {config} from '../../config';

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
        userStore.addListener(this.getCards.bind(this), ProfileActionTypes.GET_DATA);
        userStore.addListener(this.onUploadAvatar, ProfileActionTypes.UPLOAD_AVATAR);
        userStore.addListener(this.onUploadAvatar,
            ProfileActionTypes.DELETE_AVATAR);
        userStore.addListener(this.editUserInfo, ProfileActionTypes.SAVE_EDIT_DATA);
        userStore.addListener(this.renderAddresses.bind(this), ProfileActionTypes.SAVE_ADD_ADDRESS);
        userStore.addListener(this.renderAddresses.bind(this), ProfileActionTypes.SAVE_EDIT_ADDRESS);
        userStore.addListener(this.renderPaymentCards.bind(this), ProfileActionTypes.SAVE_ADD_CARD);
        userStore.addListener(this.renderAddresses.bind(this), ProfileActionTypes.DELETE_ADDRESS);
        userStore.addListener(this.renderPaymentCards.bind(this), ProfileActionTypes.DELETE_CARD);
    }

    /**
     * Функция, изменяющая данные пользователя
     */
    editUserInfo() {
        switch (userStore.getContext(userStore._storeNames.responseCode)) {
            case config.responseCodes.code200:
                this.removePopUp();
                const data = userStore.getContext(userStore._storeNames.temp);
                document.getElementById(`${data.id}-text`).innerText = data.value;
                break;
            default:
                console.log('error');
        }
    }

    /**
     * Функция, делающая изменяющая данные о способах оплаты
     */
    renderPaymentCards() {
        this.removeListenerPaymentCard();
        const bankCard = document.getElementById('payment-cards-items_user-page');
        bankCard.innerHTML = '';
        this.loadCards(new PaymentCard(bankCard),
            'paymentCard', userStore.getContext(userStore._storeNames.paymentMethods));
        this.startListenerPaymentCard();
    }

    /**
     * Функция, делающая изменяющая данные об адресах доставки
     */
    renderAddresses() {
        this.removeListenerAddressCard();
        const addressCard = document.getElementById('address-cards_user-page-items');
        addressCard.innerHTML = '';
        this.loadCards(new AddressCard(
            addressCard),
        'addressCard', userStore.getContext(userStore._storeNames.address));
        this.startListenerAddressCard();
    }

    /**
     * Функция, делающая запрос за картами пользователя и загружающая их
     */
    getCards() {
        this.loadCards(null, 'userDataCard', {
            name: userStore.getContext(userStore._storeNames.name),
            email: userStore.getContext(userStore._storeNames.email),
            phone: userStore.getContext(userStore._storeNames.phone),
            avatar: userStore.getContext(userStore._storeNames.avatar),
        });
        this.renderPaymentCards();
        this.renderAddresses();

        this.startEventListener();
    }

    /**
     * Функция, делающая запрос за картами пользователя и загружающая их
     */
    onUploadAvatar() {
        document.getElementById('user-photo_user-page').src =
            userStore.getContext(userStore._storeNames.avatar);
    }

    /**
     * Функция, подгружающая и отрисовывающая карты пользователя
     * @param {object} componentEntity - экземпляр класса компонента
     * @param {string} nameOfCard - название карты
     * @param {object} data - данные для заполнения карт
     */
    loadCards(componentEntity, nameOfCard, data) {
        switch (nameOfCard) {
        case 'userDataCard':
            super.render(data);
            return;
        case 'paymentCard':
            Object.values(data).forEach((address) => {
                address.id = 'paymentCard/' + address.id;
            });
            break;
        case 'addressCard':
            Object.values(data).forEach((address) => {
                address.id = 'addressCard/' + address.id;
            });
            break;
        default:
            console.log('unknown command', nameOfCard);
        }
        if (Object.keys(data).length < 4) {
            data.addCard = {
                addCard: true,
                id: `${nameOfCard}/${String(Object.keys(data).length)}`,
            };
        }
        componentEntity.render(data);
        delete data.addCard;
    }

    /**
     * Метод, убирающий поп-ап.
     */
    removePopUp() { // возможно, следует вынести в другое место
        const PopUp = document.getElementById('popUp_user-page');
        const PopUpFade = document.getElementById('popUp-fade_user-page');
        if (PopUp) {
            PopUp.style.display = 'none';
            PopUp.replaceChildren();
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'none';
        }
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
     * @param {object} event - событие, вызвавшее обработчик
     */
    async listenMouseOutAddressCard(event) {
        const {id} = event.target;
        const PopUp = document
            .getElementById('change-address-card' + id.replace('wrapper', ''));
        if (PopUp) {
            PopUp.style.display = 'none';
        }
    }

    /**
     * Функция для передачи в слушателе click на значок редактирования
     * данных пользователя
     * @param {HTMLElement} element - элемент DOM-дерева
     * @param {object} event - событие
     */
    async listenClickUserInfo(element, event) {
        event.preventDefault();
        const PopUp = document.getElementById('popUp_user-page');
        const PopUpFade = document.getElementById('popUp-fade_user-page');
        if (PopUp) {
            PopUp.style.display = 'block';
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'block';
        }
        this.PopUpEditUserInfo = new PopUpEditUserInfo(PopUp);
        this.PopUpEditUserInfo.render(element);
    }

    /**
     * Функция для передачи в слушателе click на значок редактирования аватара
     * @param {object} target - событие
     */
    async listenClickAvatar({target}) {
        switch (target.id) {
        case 'changeUserPhoto':
            const inputImg = document.getElementById('changeUserPhoto__upload');
            inputImg.click();
            break;
        case 'deleteUserPhoto':
            profileAction.deleteAvatar();
            break;
        }
    }

    /**
     * Метод, загружающий файл из <input>
     * @param {object} target - событие
     */
    async uploadFile({target}) {
        profileAction.uploadAvatar(target.files[0]);
    }

    /**
     * Метод, добавляющий слушатели для способов оплаты.
     */
    startListenerPaymentCard() {
        this.paymentCard = document.querySelectorAll('.payment-card-wrapper');
        if (this.paymentCard) {
            this.paymentCard.forEach((paymentCard) => {
                paymentCard.addEventListener('mouseenter', this.listenMouseOverPaymentCard);
                paymentCard.addEventListener('mouseleave', this.listenMouseOutPaymentCard);
            });
        } else {
            console.log('element not found', this.paymentCard);
        }
    }

    /**
     * Метод, добавляющий слушатели для карт адресов.
     */
    startListenerAddressCard() {
        this.addressCard = document.querySelectorAll('.address-card-wrapper');
        if (this.addressCard) {
            this.addressCard.forEach((addressCard) => {
                addressCard.addEventListener('mouseenter', this.listenMouseOverAddressCard);
                addressCard.addEventListener('mouseleave', this.listenMouseOutAddressCard);
            });
        } else {
            console.log('element not found', this.addressCard);
        }
    }

    /**
     * Метод, удаляющий слушатели для способов оплаты.
     */
    removeListenerPaymentCard() {
        if (this.paymentCard) {
            this.paymentCard.forEach((key) => {
                key.removeEventListener('mouseenter', this.listenMouseOverPaymentCard);
                key.removeEventListener('mouseleave', this.listenMouseOutPaymentCard);
            });
        }
    }

    /**
     * Метод, удаляющий слушатели для карт адресов.
     */
    removeListenerAddressCard() {
        if (this.addressCard) {
            this.addressCard.forEach((key) => {
                key.removeEventListener('mouseenter', this.listenMouseOverAddressCard);
                key.removeEventListener('mouseleave', this.listenMouseOutAddressCard);
            });
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        this.fileSelector = document.getElementById('changeUserPhoto__upload');
        if (this.fileSelector) {
            this.fileSelector.addEventListener('change', this.uploadFile);
        }

        this.avatar = document.getElementById('change-user-photo_user-page');
        if (this.avatar) {
            this.avatar.addEventListener('click', this.listenClickAvatar);
        } else {
            console.log('element not found', this.avatar);
        }

        this.profile = document.getElementById('user-photo-block');
        if (this.profile) {
            this.profile.addEventListener('mouseenter', this.listenMouseOverProfile);
            this.profile.addEventListener('mouseleave', this.listenMouseOutProfile);
        } else {
            console.log('element not found', this.profile);
        }

        this.userInfo = document.querySelectorAll('.edit-profile-data');
        if (this.userInfo) {
            this.userInfoArr = [];
            this.userInfo.forEach((key, index) => {
                this.userInfoArr.push(this.listenClickUserInfo.bind(this, key.parentNode));
                key.addEventListener('click', this.userInfoArr[index]);
            });
        } else {
            console.log('element not found', this.userInfo);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        if (this.fileSelector) {
            this.fileSelector.removeEventListener('change', this.uploadFile);
        }

        if (this.avatar) {
            this.avatar.removeEventListener('click', this.listenClickAvatar);
        }

        if (this.profile) {
            this.profile.removeEventListener('mouseenter', this.listenMouseOverProfile);
            this.profile.removeEventListener('mouseleave', this.listenMouseOutProfile);
        }

        if (this.userInfo) {
            this.userInfo.forEach((key, index) => {
                key.removeEventListener('click', this.userInfoArr[index]);
            });
        }
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    async render() {
        profileAction.getData();
    }
}
