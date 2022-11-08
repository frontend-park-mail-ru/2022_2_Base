import BaseStore from './BaseStore.js';
import {UserActionTypes} from '../actions/user.js';
import {ProfileActionTypes} from '../actions/profile.js';
import request from '../modules/ajax.js';
import {config} from '../config.js';
import errorMessage from '../modules/ErrorMessage.js';
import validation from '../modules/validation.js';

/**
 * Класс, реализующий базовое хранилище.
 */
class UserStore extends BaseStore {
    #context = {
        fields: {
            name: {
                title: 'Имя',
                type: 'text',
                name: 'username',
                placeholder: 'Введите имя',
                maxLength: '30',
                errorID: 'nameError',
            },
            email: {
                title: 'Почта',
                type: 'email',
                name: 'email',
                placeholder: 'mail@website.com',
                maxLength: '30',
                errorID: 'emailError',
            },
            password: {
                title: 'Пароль',
                type: 'password',
                name: 'password',
                placeholder: 'Придумайте пароль',
                maxLength: '16',
                errorID: 'passwordError',
            },
            repeatPassword: {
                title: 'Повторить пароль',
                type: 'password',
                name: 'repeatPassword',
                placeholder: 'Повторите пароль',
                maxLength: '16',
                errorID: 'repeatPasswordError',
            },
        },
        button: {
            buttonValue: 'Зарегистрироваться',
        },
    };

    _storeNames = {
        isAuth: 'isAuth',
        authResponse: 'authResponse',
        name: 'name',
        surname: 'surname',
        email: 'email',
        phone: 'phone',
        context: 'context',
    };

    /**
     * @constructor
     */
    constructor() {
        super();
        this._storage = new Map();
        this._storage.set(this._storeNames.isAuth, false);
        this._storage.set(this._storeNames.authResponse, null);
        this._storage.set(this._storeNames.name, null);
        this._storage.set(this._storeNames.surname, null);
        this._storage.set(this._storeNames.email, null);
        this._storage.set(this._storeNames.phone, null);
        this._storage.set(this._storeNames.context, this.#context);
    }

    /**
     * Метод, реализующий реакцию на рассылку Диспетчера.
     * @param {Object} payload полезная нагрузка запроса
     */
    async _onDispatch(payload) {
        switch (payload.actionName) {
        case UserActionTypes.USER_FETCH:
            await this._fetchUser();
            this._emitChange([UserActionTypes.USER_FETCH]);
            break;

        case UserActionTypes.USER_REGISTER:
            if (this.#validate(payload.data)) {
                await this._signup(payload.data);
                this._emitChange([UserActionTypes.USER_REGISTER]);
            }
            break;

        case UserActionTypes.USER_LOGIN:
            if (this.#validate(payload.data)) {
                await this._login(payload.data);
                this._emitChange([UserActionTypes.USER_LOGIN]);
            }
            break;

        case UserActionTypes.USER_LOGOUT:
            await this._logout();
            this._emitChange([UserActionTypes.USER_LOGOUT]);
            break;

        case ProfileActionTypes.GET_DATA:
            await this._getData();
            this._emitChange([ProfileActionTypes.GET_DATA]);
            break;

        case ProfileActionTypes.SAVE_EDIT_DATA:
            await this._saveEditData();
            this._emitChange([ProfileActionTypes.SAVE_EDIT_DATA]);
            break;

        case ProfileActionTypes.DOWNLOAD_PHOTO:
            await this._downloadPhoto();
            this._emitChange([ProfileActionTypes.DOWNLOAD_PHOTO]);
            break;

        case ProfileActionTypes.GET_CARDS:
            await this._getCards();
            this._emitChange([ProfileActionTypes.GET_CARDS]);
            break;

        case ProfileActionTypes.SAVE_ADD_CARD:
            await this._saveAddCard();
            this._emitChange([ProfileActionTypes.SAVE_ADD_CARD]);
            break;

        case ProfileActionTypes.SAVE_EDIT_CARD:
            await this._saveEditCard();
            this._emitChange([ProfileActionTypes.SAVE_EDIT_CARD]);
            break;

        case ProfileActionTypes.GET_ADDRESS:
            await this._getAddress();
            this._emitChange([ProfileActionTypes.GET_ADDRESS]);
            break;

        case ProfileActionTypes.SAVE_ADD_ADDRESS:
            await this._saveAddAddress();
            this._emitChange([ProfileActionTypes.SAVE_ADD_ADDRESS]);
            break;

        case ProfileActionTypes.SAVE_EDIT_ADDRESS:
            await this._saveEditAddress();
            this._emitChange([ProfileActionTypes.SAVE_EDIT_ADDRESS]);
            break;

        case ProfileActionTypes.DELETE_ADDRESS:
            await this._deleteAddress();
            this._emitChange([ProfileActionTypes.DELETE_ADDRESS]);
            break;

        case ProfileActionTypes.GET_BASKET:
            await this._getBasket();
            this._emitChange([ProfileActionTypes.GET_BASKET]);
            break;

        case ProfileActionTypes.SAVE_EDIT_DELIVERY:
            await this._saveEditDelivery();
            this._emitChange([ProfileActionTypes.SAVE_EDIT_DELIVERY]);
            break;
        default:
            console.log('unregistered action in user store');
        }
    }

    /**
     * Метод, реализующий получение сессии.
     */
    async _fetchUser() {
        const [status] = await request.makeGetRequest(config.api.session)
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.authResponse, status);

        if (status === 200) {
            this._storage.set(this._storeNames.isAuth, true);
        }
    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _logout() {
        const [status] = await request.makeDeleteRequest(config.api.logout)
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.authResponse, status);

        if (status === 200) {
            this._storage.set(this._storeNames.isAuth, false);
        }
    }

    /**
     * Метод, реализующий регистрацию.
     * @param {object} data - данные для входа
     */
    async _signup(data) {
        const {username, email, password} = data;
        const [status] = await request.makePostRequest(config.api.signup, {
            password,
            email,
            username,
        }).catch((err) => console.log(err));
        this._storage.set(this._storeNames.authResponse, status);

        if (status === 200) {
            this._storage.set(this._storeNames.isAuth, true);
        }
    }

    /**
     * Метод, реализующий вход в сессию.
     * @param {object} data - данные для входа
     */
    async _login(data) {
        const {email, password} = data;
        const [status] = await request.makePostRequest(config.api.login, {
            password,
            email,
        }).catch((err) => console.log(err));
        this._storage.set(this._storeNames.authResponse, status);

        if (status === 200) {
            this._storage.set(this._storeNames.isAuth, true);
            console.log('set', this._storage);
        }
    }

    /**
     * Метод, осуществляющий валидацию данных из формы.
     * @param {object} data - объект, содержащий данные из формы
     * @return {boolean} статус валидации
     */
    #validate(data) {
        let isValid = true;
        Object.entries(data).forEach(([key, value]) => {
            switch (key) {
            case this.#context.fields.name.name:
                isValid &= errorMessage.validateFiled(validation.checkEmptyField(value),
                    this.#context.fields.name);
                break;
            case this.#context.fields.email.name:
                isValid &= errorMessage.validateFiled(validation.validateEMail(value),
                    this.#context.fields.email);
                break;
            case this.#context.fields.password.name:
                isValid &= errorMessage.validateFiled(validation.validatePassword(value),
                    this.#context.fields.password);
                break;
            case this.#context.fields.repeatPassword.name:
                isValid &= errorMessage.validateFiled(validation
                    .validateRepeatPassword(data.password === data.repeatPassword),
                this.#context.fields.repeatPassword);
                break;
            }
        });
        return isValid;
    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _getData() {

    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _saveEditData() {

    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _downloadPhoto() {

    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _getCards() {

    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _saveAddCard() {

    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _saveEditCard() {

    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _getAddress() {

    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _saveAddAddress() {

    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _saveEditAddress() {

    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _deleteAddress() {

    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _getBasket() {

    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _saveEditDelivery() {

    }
}

export default new UserStore();
