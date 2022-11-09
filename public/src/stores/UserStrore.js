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
        responseCode: 'responseCode',
        name: 'name',
        surname: 'surname',
        email: 'email',
        phone: 'phone',
        context: 'context',
        avatar: 'avatar',
        paymentMethods: 'paymentMethods',
        address: 'address',
        temp: 'temp',
    };

    /**
     * @constructor
     */
    constructor() {
        super();
        this._storage = new Map();
        this._storage.set(this._storeNames.isAuth, false);
        this._storage.set(this._storeNames.responseCode, null);
        this._storage.set(this._storeNames.name, null);
        this._storage.set(this._storeNames.surname, null);
        this._storage.set(this._storeNames.email, null);
        this._storage.set(this._storeNames.phone, null);
        this._storage.set(this._storeNames.avatar, 'img/UserPhoto.png');
        this._storage.set(this._storeNames.paymentMethods, {
            item1: {
                priority: true,
                number: '123456******1234',
                type: 'MIR',
                expiryDate: '00/00',
                id: `paymentCard/${String(1)}`,
            },
            item2: {
                number: '123456******1234',
                type: 'MIR',
                expiryDate: '00/00',
                id: `paymentCard/${String(2)}`,
            },
        });
        this._storage.set(this._storeNames.address, {
            item1: {
                priority: true,
                city: 'г. Москва',
                street: 'улица Бассейная',
                house: '228',
                flat: '420',
                id: `addressCard/${String(1)}`,
            },
            item2: {
                city: 'г. Москва',
                street: 'улица Бассейная',
                house: '228',
                flat: '420',
                id: `addressCard/${String(2)}`,
            },
        });
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
            await this._saveEditData(payload.data);
            this._emitChange([ProfileActionTypes.SAVE_EDIT_DATA]);
            break;

        case ProfileActionTypes.UPLOAD_AVATAR:
            await this._uploadAvatar(payload.data);
            this._emitChange([ProfileActionTypes.UPLOAD_AVATAR]);
            break;

        case ProfileActionTypes.DELETE_AVATAR:
            await this._uploadAvatar(null);
            this._emitChange([ProfileActionTypes.DELETE_AVATAR]);
            break;

        case ProfileActionTypes.GET_CARDS:
            await this._getCards();
            this._emitChange([ProfileActionTypes.GET_CARDS]);
            break;

        case ProfileActionTypes.SAVE_ADD_CARD:
            await this._saveAddCard(payload.data);
            this._emitChange([ProfileActionTypes.SAVE_ADD_CARD]);
            break;

        case ProfileActionTypes.DELETE_CARD:
            await this._saveDeleteCard(payload.data);
            this._emitChange([ProfileActionTypes.DELETE_CARD]);
            break;

        case ProfileActionTypes.GET_ADDRESS:
            await this._getAddress();
            this._emitChange([ProfileActionTypes.GET_ADDRESS]);
            break;

        case ProfileActionTypes.SAVE_ADD_ADDRESS:
            await this._saveAddAddress(payload.data);
            this._emitChange([ProfileActionTypes.SAVE_ADD_ADDRESS]);
            break;

        case ProfileActionTypes.SAVE_EDIT_ADDRESS:
            await this._saveEditAddress(payload.data);
            this._emitChange([ProfileActionTypes.SAVE_EDIT_ADDRESS]);
            break;

        case ProfileActionTypes.DELETE_ADDRESS:
            await this._deleteAddress(payload.data);
            this._emitChange([ProfileActionTypes.DELETE_ADDRESS]);
            break;

        case ProfileActionTypes.GET_BASKET:
            await this._getBasket();
            this._emitChange([ProfileActionTypes.GET_BASKET]);
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

        this._storage.set(this._storeNames.responseCode, status);

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

        this._storage.set(this._storeNames.responseCode, status);

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
        this._storage.set(this._storeNames.responseCode, status);

        if (status === 201) {
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
        this._storage.set(this._storeNames.responseCode, status);

        if (status === 201) {
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
     * Метод, реализующий получение данных пользователя.
     */
    async _getData() {
        const [status, outD] = await request.makeGetRequest(config.api.profile)
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200) {
            this._storage.set(this._storeNames.name, outD.username);
            this._storage.set(this._storeNames.email, outD.email);
            this._storage.set(this._storeNames.phone, outD.phone);
            this._storage.set(this._storeNames.avatar, outD.avatar);
            this._storage.set(this._storeNames.paymentMethods, outD.paymentMethods);
            this._storage.set(this._storeNames.address, outD.address);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Метод, реализующий сохранение данных профиля.
     * @param {object} data данные для изменения
     */
    async _saveEditData(data) {
        let sendData = {};
        switch (data.id) {
        case 'name':
            sendData = {
                username: data.value,
            };
            break;
        case 'email':
            sendData = {
                email: data.value,
            };
            break;
        case 'phone':
            sendData = {
                phone: data.value,
            };
            break;
        case 'password':
            sendData = {
                password: data.value,
            };
            const [status] = await request.makePostRequest(config.api.password, sendData)
                .catch((err) => console.log(err));
            if (status === 200) {
                console.log(data.id, status);
            }
            return;
        }
        const [status] = await request.makePostRequest(config.api.profile, sendData)
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.responseCode, status);
        this._storage.set(this._storeNames.temp, data);
        if (status === 200) {
            this._storage.has(data.id) ?
                this._storage.set(data.id, data.value) : console.log('wrong id');
        } else {
            console.log(data.id, status);
        }
    }

    /**
     * Метод, реализующий загрузку аватара.
     * @param {Blob} avatar
     */
    async _uploadAvatar(avatar) {
        const [status] = await request.makePostRequest(config.api.uploadAvatar, avatar)
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200) {
            this._storage.set(this._storeNames.avatar,
                URL.createObjectURL(avatar ?? 'img/UserPhoto.png'));
        } else {
            console.log('error', status);
        }
    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _getCards() {

    }

    /**
     * Метод, реализующий сохранение карты.
     * @param {object} data - данные для обработки
     */
    async _saveAddCard(data) {
        // ??
        const [status] = await request.makePostRequest(config.api.profile, data)
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200) {
            const paymentMethods = this._storage.get(this._storeNames.paymentMethods);
            data.id = `paymentCard/${String(Object.keys(paymentMethods).length)}`;
            Object.values(paymentMethods).forEach((item) => item.priority = false);
            data.priority = true;
            paymentMethods[`${Object.keys(paymentMethods).length}`] = data;
            this._storage.set(this._storeNames.paymentMethods, paymentMethods);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Метод, реализующий удаление способа оплаты.
     * @param {int} id - идентификатор элемента
     */
    async _saveDeleteCard(id) {
        const paymentMethods = this._storage.get(this._storeNames.paymentMethods);
        Object.entries(paymentMethods).forEach(([key, item]) => {
            if (item.id === id) {
                delete paymentMethods[key];
            }
        });
        const [status] = await request.makePostRequest(config.api.profile, paymentMethods)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200) {
            this._storage.set(this._storeNames.paymentMethods, paymentMethods);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _getAddress() {

    }

    /**
     * Метод, реализующий добавление карты адреса.
     * @param {object} data - данные для обработки
     */
    async _saveAddAddress(data) {
        // ???
        const [status] = await request.makePostRequest(config.api.profile, data)
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200) {
            const addresses = this._storage.get(this._storeNames.address);
            data.id = `addressCard/${String(Object.keys(addresses).length)}`;
            Object.values(addresses).forEach((item) => item.priority = false);
            data.priority = true;
            addresses[`${Object.keys(addresses).length}`] = data;
            this._storage.set(this._storeNames.address, addresses);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Метод, реализующий изменение карты адреса.
     * @param {object} data - данные для обработки
     */
    async _saveEditAddress(data) {
        // ??
        const addresses = this._storage.get(this._storeNames.address);
        Object.entries(addresses).forEach(([key, item]) => {
            if (item.id === data.id) {
                data.priority = item.priority;
                addresses[key] = data;
            }
        });
        const [status] = await request.makePostRequest(config.api.profile, addresses)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200) {
            this._storage.set(this._storeNames.address, addresses);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Метод, реализующий удаление карты адреса.
     * @param {int} id - идентификатор элемента
     */
    async _deleteAddress(id) {
        // ??
        const addresses = this._storage.get(this._storeNames.address);
        Object.entries(addresses).forEach(([key, item]) => {
            if (item.id === id) {
                delete addresses[key];
            }
        });
        const [status] = await request.makePostRequest(config.api.profile, addresses)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200) {
            this._storage.set(this._storeNames.address, addresses);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Метод, реализующий запрос корзины.
     */
    async _getBasket() {

    }
}

export default new UserStore();
