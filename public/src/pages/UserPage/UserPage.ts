import BasePage from '../BasePage';
import PaymentCard from '../../components/InfoCard/PaymentCard/PaymentCard';
import AddressCard from '../../components/InfoCard/AddressCard/AddressCard';
import PopUpEditUserInfo from '../../components/popUp/PopUpEditUserInfo/PopUpEditUserInfo';
import UserPageTemplate from './UserPage.hbs';
import './UserPage.scss';
import {profileAction, ProfileActionTypes} from '../../actions/profile';
import userStore from '../../stores/UserStore';
import {config} from '../../config';
import errorMessage from '../../modules/ErrorMessage';
import refreshElements from '../../modules/refreshElements';
import {UserPageLoadCardsPages} from '../../../../types/aliases';
import {getStringValueFromStore} from '../../modules/sharedFunctions';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class UserPage extends BasePage {
    PopUpEditUserInfo: PopUpEditUserInfo | undefined;
    addressCard: NodeListOf<Element> | undefined;
    avatar: HTMLElement | null;
    fileSelector: HTMLElement | null;
    paymentCard: NodeListOf<Element> | undefined;
    profile: HTMLElement | null;
    userInfo: NodeListOf<Element> | undefined;
    userInfoArr: Array<any>;
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param parent - HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(
            parent,
            UserPageTemplate,
        );

        this.PopUpEditUserInfo = undefined;
        this.addressCard = undefined;
        this.avatar = null;
        this.fileSelector = null;
        this.paymentCard = undefined;
        this.profile = null;
        this.userInfo = undefined;
        this.userInfoArr = [];
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    override addListener() {
        userStore.addListener(this.getCards.bind(this), ProfileActionTypes.GET_DATA);
        userStore.addListener(this.onUploadAvatar, ProfileActionTypes.UPLOAD_AVATAR);
        userStore.addListener(this.onUploadAvatar,
            ProfileActionTypes.DELETE_AVATAR);

        userStore.addListener(this.templateFunction.bind(this, this.editUserInfo.bind(this)),
            ProfileActionTypes.SAVE_EDIT_DATA);

        userStore.addListener(this.templateFunction.bind(this, this.renderAddresses.bind(this)),
            ProfileActionTypes.SAVE_ADD_ADDRESS);

        userStore.addListener(this.templateFunction.bind(this, this.renderAddresses.bind(this)),
            ProfileActionTypes.SAVE_EDIT_ADDRESS);

        userStore.addListener(this.templateFunction.bind(this, this.renderPaymentCards.bind(this)),
            ProfileActionTypes.SAVE_ADD_CARD);

        userStore.addListener(this.templateFunction.bind(this, this.renderAddresses.bind(this)),
            ProfileActionTypes.DELETE_ADDRESS);

        userStore.addListener(this.templateFunction.bind(this, this.renderPaymentCards.bind(this)),
            ProfileActionTypes.DELETE_CARD);
    }

    /**
     * Функция, для передачи в листнер стора
     * @param toDo - обработчик события
     */
    templateFunction(toDo: emptyCallback) {
        switch (userStore.getContext(userStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            if (typeof toDo === 'function') {
                toDo();
            }
            break;
        case config.responseCodes.code401:
            errorMessage.getAbsoluteErrorMessage('Старый пароль не верный');
            break;
        default:
            errorMessage.getAbsoluteErrorMessage();
        }
    }

    /**
     * Функция, изменяющая данные пользователя
     */
    editUserInfo() {
        this.removePopUp();
        const data = userStore.getContext(userStore._storeNames.temp);
        const userInfoText = document.getElementById(
            `${data.id}-text`);
        if (userInfoText) {
            userInfoText.innerText = data.value;
        }
    }

    /**
     * Функция, делающая изменяющая данные о способах оплаты
     */
    renderPaymentCards() {
        this.removePopUp();
        this.removeListenerPaymentCard();
        const bankCard = document.getElementById('payment-cards-items_user-page');
        if (bankCard) {
            bankCard.innerHTML = '';
            this.loadCards(new PaymentCard(bankCard),
                'paymentCard', userStore.getContext(userStore._storeNames.paymentMethods));
            this.startListenerPaymentCard();
        }
    }

    /**
     * Функция, делающая изменяющая данные об адресах доставки
     */
    renderAddresses() {
        this.removePopUp();
        this.removeListenerAddressCard();
        const addressCard = document.getElementById('address-cards_user-page-items');
        if (addressCard) {
            addressCard.innerHTML = '';
            this.loadCards(new AddressCard(
                addressCard),
            'addressCard', userStore.getContext(userStore._storeNames.address));
            this.startListenerAddressCard();
        }
    }

    /**
     * Функция, делающая запрос за картами пользователя и загружающая их
     */
    getCards() {
        this.loadCards(null, 'userDataCard', [{
            name: getStringValueFromStore(userStore.getContext(userStore._storeNames.name)),
            email: getStringValueFromStore(userStore.getContext(userStore._storeNames.email)),
            phone: getStringValueFromStore(userStore.getContext(userStore._storeNames.phone)),
            avatar: getStringValueFromStore(userStore.getContext(userStore._storeNames.avatar)),
            id: '',
        }]);
        this.renderPaymentCards();
        this.renderAddresses();
        this.startEventListener();
    }

    /**
     * Функция, делающая запрос за картами пользователя и загружающая их
     */
    onUploadAvatar() {
        const userAvatar = document.getElementById('user-photo_user-page');
        if (userAvatar instanceof HTMLImageElement) {
            userAvatar.src =
                userStore.getContext(userStore._storeNames.avatar);
        }
    }

    /**
     * Функция, подгружающая и отрисовывающая карты пользователя
     * @param componentEntity - экземпляр класса компонента
     * @param nameOfCard - название карты
     * @param data - данные для заполнения карт
     */
    loadCards(componentEntity: UserPageLoadCardsPages, nameOfCard: string, data: Array<CardObj>) {
        switch (nameOfCard) {
        case 'userDataCard':
            super.render(data[0]);
            return;
        case 'paymentCard':
            data.forEach((paymentCard: CardObj) => {
                paymentCard.id = 'paymentCard/' + paymentCard.id;
            });
            break;
        case 'addressCard':
            data.forEach((address: CardObj) => {
                address.id = 'addressCard/' + address.id;
            });
            break;
        default:
            console.log('unknown command', nameOfCard);
        }
        if (data.length < 4) {
            data.push({
                addCard: true,
                id: `${nameOfCard}/${String(data.length)}`,
                name: '',
                email: '',
                phone: '',
                avatar: '',
            });
        }
        componentEntity.render(data);
        if (data[data.length - 1].addCard) {
            data.pop();
        }
    }

    /**
     * Метод, убирающий поп-ап.
     */
    removePopUp() {
        const PopUp = document.getElementById('popUp_user-page');
        const PopUpFade = document.getElementById('popUp-fade_user-page');
        if (PopUp) {
            PopUp.style.display = 'none';
            PopUp.replaceChildren();
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'none';
            config.HTMLskeleton.body.style.overflow = 'visible';
        }
    }

    /**
     * Функция для передачи в слушателе mouseover на фотографии пользователя.
     */
    async listenMouseOverProfile() {
        const PopUp = document.getElementById('change-user-photo_user-page');
        if (PopUp) {
            PopUp.style.display = 'flex';
        }
    }

    /**
     * Функция для передачи в слушателе mouseout на фотографии пользователя.
     */
    async listenMouseOutProfile() {
        const PopUp = document.getElementById('change-user-photo_user-page');
        if (PopUp) {
            PopUp.style.display = 'none';
        }
    }

    /**
     * Функция для передачи в слушателе mouseover на карточке банковской карты.
     * @param event - событие, вызвавшее обработчик
     */
    async listenMouseOverPaymentCard(event: Event) {
        if (event.target instanceof HTMLElement) {
            const PopUp = document
                .getElementById('change-payment-card' +
                    event.target.id.replace('wrapper', ''));
            if (PopUp) {
                PopUp.style.display = 'flex';
            }
        }
    }

    /**
     * Функция для передачи в слушателе mouseout на карточке банковской карты.
     * @param event - событие, вызвавшее обработчик
     */
    async listenMouseOutPaymentCard(event: Event) {
        if (event.target instanceof HTMLElement) {
            const PopUp = document
                .getElementById('change-payment-card' +
                    event.target.id.replace('wrapper', ''));
            if (PopUp) {
                PopUp.style.display = 'none';
            }
        }
    }

    /**
     * Функция для передачи в слушателе mouseover на карточке адреса.
     * @param event - событие, вызвавшее обработчик
     */
    async listenMouseOverAddressCard(event: Event) {
        if (event.target instanceof HTMLElement) {
            const PopUp = document
                .getElementById('change-address-card' +
                    event.target.id.replace('wrapper', ''));
            if (PopUp) {
                PopUp.style.display = 'flex';
            }
        }
    }

    /**
     * Функция для передачи в слушателе mouseout на карточке адреса.
     * @param event - событие, вызвавшее обработчик
     */
    async listenMouseOutAddressCard(event: Event) {
        if (event.target instanceof HTMLElement) {
            const PopUp = document
                .getElementById('change-address-card' +
                    event.target.id.replace('wrapper', ''));
            if (PopUp) {
                PopUp.style.display = 'none';
            }
        }
    }

    /**
     * Функция для передачи в слушателе click на значок редактирования
     * данных пользователя
     * @param element - элемент DOM-дерева
     * @param event - событие
     */
    async listenClickUserInfo(element: HTMLElement, event: Event) {
        event.preventDefault();
        const PopUp = document.getElementById('popUp_user-page');
        const PopUpFade = document.getElementById('popUp-fade_user-page');
        if (PopUp instanceof HTMLElement) {
            PopUp.style.display = 'block';
            this.PopUpEditUserInfo = new PopUpEditUserInfo(PopUp);
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'block';
            config.HTMLskeleton.body.style.overflow = 'hidden';
        }
        this.PopUpEditUserInfo?.render(element);
    }

    /**
     * Функция для передачи в слушателе click на значок редактирования аватара
     * @param target - событие
     */
    async listenClickAvatar({target}: Event) {
        switch (target instanceof HTMLElement && target.id) {
        case 'changeUserPhoto': {
            const inputImg = document.getElementById('changeUserPhoto__upload');
            inputImg?.click();
            break;
        }
        case 'deleteUserPhoto':
            profileAction.deleteAvatar();
            break;
        }
    }

    /**
     * Метод, загружающий файл из <input>
     * @param target - событие
     */
    async uploadFile({target}: Event) {
        if (target instanceof HTMLInputElement && target.files) {
            profileAction.uploadAvatar(target.files[0]);
        }
    }

    /**
     * Метод, добавляющий слушатели для способов оплаты.
     */
    startListenerPaymentCard() {
        this.paymentCard = document.querySelectorAll('.payment-card-wrapper');
        if (this.paymentCard) {
            this.paymentCard.forEach((paymentCard: Element) => {
                paymentCard.addEventListener('mouseenter', this.listenMouseOverPaymentCard);
                paymentCard.addEventListener('mouseleave', this.listenMouseOutPaymentCard);
            });
        }
    }

    /**
     * Метод, добавляющий слушатели для карт адресов.
     */
    startListenerAddressCard() {
        this.addressCard = document.querySelectorAll('.address-card-wrapper');
        if (this.addressCard) {
            this.addressCard.forEach((addressCard: Element) => {
                addressCard.addEventListener('mouseenter', this.listenMouseOverAddressCard);
                addressCard.addEventListener('mouseleave', this.listenMouseOutAddressCard);
            });
        }
    }

    /**
     * Метод, удаляющий слушатели для способов оплаты.
     */
    removeListenerPaymentCard() {
        if (this.paymentCard) {
            this.paymentCard.forEach((key: Element) => {
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
            this.addressCard?.forEach((key: Element) => {
                key.removeEventListener('mouseenter', this.listenMouseOverAddressCard);
                key.removeEventListener('mouseleave', this.listenMouseOutAddressCard);
            });
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    override startEventListener() {
        this.fileSelector = document.getElementById('changeUserPhoto__upload');
        if (this.fileSelector) {
            this.fileSelector.addEventListener('change', this.uploadFile);
        }

        this.avatar = document.getElementById('change-user-photo_user-page');
        if (this.avatar) {
            this.avatar.addEventListener('click', this.listenClickAvatar);
        }

        this.profile = document.getElementById('user-photo-block');
        if (this.profile) {
            this.profile.addEventListener('mouseenter', this.listenMouseOverProfile);
            this.profile.addEventListener('mouseleave', this.listenMouseOutProfile);
        }

        this.userInfo = document.querySelectorAll('.edit-profile-data');
        if (this.userInfo) {
            this.userInfoArr = [];
            this.userInfo.forEach((key: any, index: number) => {
                this.userInfoArr.push(this.listenClickUserInfo.bind(this, key.parentNode));
                key.addEventListener('click', this.userInfoArr[index]);
            });
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
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
            this.userInfo.forEach((key: any, index: number) => {
                key.removeEventListener('click', this.userInfoArr[index]);
            });
        }

        this.removeListenerPaymentCard();
        this.removeListenerAddressCard();
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    override async render() {
        if (userStore.getContext(userStore._storeNames.isAuth)) {
            this.addListener();
            profileAction.getData();
        } else {
            refreshElements.showUnAuthPage({
                text: 'Чтобы посмотреть Ваш профиль надо',
                linkToPage: config.href.login,
                linkText: 'войти',
                textAfterLink: '.',
            });
        }
    }
}
