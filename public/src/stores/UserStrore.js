import BaseStore from './BaseStore.js';
import {UserActionTypes} from '../actions/user.js';
import {ProfileActionTypes} from '../actions/profile.js';
import request from '../modules/ajax.js';
import {config} from '../config.js';
import errorMessage from '../modules/ErrorMessage.js';
import validation from '../modules/validation.js';
import {cartAction} from '../actions/cart';

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
                popUpName: 'name__popUp__div',
                /**
                 * поле popUpName было добавлено для корректной работы с поп-апами уже реализованного
                 * класса валидации. По значению поля проводится getElementById поля в поп-апе,
                 * после чего в случае некорректности введенного к полю прикрепляется сообщение
                 * об ошибке.
                 */
                placeholder: 'Введите имя',
                maxLength: '30',
                errorID: 'nameError',
            },
            phone: {
                title: 'Телефон',
                type: 'number',
                name: 'phone',
                popUpName: 'phone__popUp__div',
                placeholder: 'Введите телефон',
                maxLength: '11',
                errorID: 'phoneError',
            },
            email: {
                title: 'Почта',
                type: 'email',
                name: 'email',
                popUpName: 'email__popUp__div',
                placeholder: 'mail@website.com',
                maxLength: '30',
                errorID: 'emailError',
            },
            password: {
                title: 'Пароль',
                type: 'password',
                name: 'password',
                popUpName: 'password__popUp__div',
                placeholder: 'Придумайте пароль',
                maxLength: '16',
                errorID: 'passwordError',
            },
            repeatPassword: {
                title: 'Повторить пароль',
                type: 'password',
                name: 'repeatPassword',
                popUpName: 'password__2__popUp__div',
                fieldName: 'password__2__popUp',
                placeholder: 'Повторите пароль',
                maxLength: '16',
                errorID: 'repeatPasswordError',
            },
        },
        button: {
            buttonValue: 'Зарегистрироваться',
        },
    };

    #testPaymentCards = [
        {
            id: 60,
            type: '',
            number: '1232131232131231',
            expiryDate: '2053-01-31T00:00:00Z',
            priority: false,
        },
        {
            number: '123456******5678',
            type: 'MIR',
            expiry: '1987-08-19T23:15:30.000Z',
            id: 2,
        },
    ];

    #testAddressCards = [
        {
            priority: true,
            city: 'г. Москва',
            street: 'улица Бауманская',
            house: '228',
            flat: '420',
            id: 1, // addressCard/
        },
        {
            city: 'г. Москва',
            street: 'улица Бассейная',
            house: '228',
            flat: '420',
            id: 2,
        },
    ];

    _storeNames = {
        isAuth: 'isAuth',
        responseCode: 'responseCode',
        name: 'name',
        email: 'email',
        phone: 'phone',
        context: 'context',
        avatar: 'avatar',
        paymentMethods: 'paymentMethods',
        address: 'address',
        temp: 'temp',
        isValid: 'isValid',
        errorMessage: 'ErrorMessage',
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
        this._storage.set(this._storeNames.email, null);
        this._storage.set(this._storeNames.phone, null);
        this._storage.set(this._storeNames.avatar, 'img/UserPhoto.png');
        this._storage.set(this._storeNames.paymentMethods, []); // this.#testPaymentCards
        this._storage.set(this._storeNames.address, []); // this.#testAddressCards
        this._storage.set(this._storeNames.context, this.#context);
        this._storage.set(this._storeNames.isValid, null);
        this._storage.set(this._storeNames.errorMessage, '');
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

        case ProfileActionTypes.SAVE_ADD_CARD:
            await this._saveAddCard(payload.data);
            this._emitChange([ProfileActionTypes.SAVE_ADD_CARD]);
            break;

        case ProfileActionTypes.DELETE_CARD:
            await this._saveDeleteCard(payload.data);
            this._emitChange([ProfileActionTypes.DELETE_CARD]);
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
        }
    }

    /**
     * Метод, реализующий получение сессии.
     */
    async _fetchUser() {
        const [status] = await request.makeGetRequest(config.api.session)
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.responseCode, status);

        if (status === config.responseCodes.code200) {
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

        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames.isAuth, false);
            cartAction.resetCart();
        }
    }

    /**
     * Метод, реализующий авторизацию.
     * @param {string} path - путь запроса
     * @param {object} data - данные для авторизации
     */
    async #auth(path, data) {
        const [status] = await request.makePostRequest(path, data)
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.responseCode, status);

        if (status === config.responseCodes.code201) {
            this._storage.set(this._storeNames.isAuth, true);
            cartAction.mergeCart();
        }
    }

    /**
     * Метод, реализующий регистрацию.
     * @param {object} data - данные для входа
     */
    async _signup(data) {
        const {username, email, password} = data;
        await this.#auth(config.api.signup, {
            password,
            email,
            username,
        });
    }

    /**
     * Метод, реализующий вход в сессию.
     * @param {object} data - данные для входа
     */
    async _login(data) {
        const {email, password} = data;
        await this.#auth(config.api.login, {
            password,
            email,
        });
    }

    /**
     * Метод, осуществляющий валидацию данных из формы.
     * @param {object} data - объект, содержащий данные из формы
     * @return {boolean} статус валидации
     */
    #validate(data) {
        let isValid = true; // ?
        Object.entries(data).forEach(([key, value]) => {
            switch (key) {
            case this.#context.fields.name.name:
                isValid &= errorMessage.validateField(validation.checkEmptyField(value),
                    this.#context.fields.name);
                break;
            case this.#context.fields.email.name:
                isValid &= errorMessage.validateField(validation.validateEMail(value),
                    this.#context.fields.email, 'login__form__error');
                break;
            case this.#context.fields.password.name:
                isValid &= errorMessage.validateField(validation.validatePassword(value),
                    this.#context.fields.password);
                break;
            case this.#context.fields.repeatPassword.name:
                isValid &= errorMessage.validateField(validation
                    .validateRepeatPassword(data.password === data.repeatPassword),
                this.#context.fields.repeatPassword);
                break;
            case this.#context.fields.name.popUpName:
                isValid &= errorMessage.validateField(validation.checkEmptyField(value),
                    {
                        name: this.#context.fields.name.popUpName,
                        errorID: this.#context.fields.name.errorID,
                    }, 'userpage__popUp__error');
                break;
            case this.#context.fields.email.popUpName:
                isValid &= errorMessage.validateField(validation.validateEMail(value),
                    {
                        name: this.#context.fields.email.popUpName,
                        errorID: this.#context.fields.email.errorID,
                    }, 'userpage__popUp__error');
                break;
            case this.#context.fields.phone.popUpName:
                isValid &= errorMessage.validateField(validation.validatePhone(value),
                    {
                        name: this.#context.fields.phone.popUpName,
                        errorID: this.#context.fields.phone.errorID,
                    }, 'userpage__popUp__error');
                break;
            case this.#context.fields.password.popUpName:
                isValid &= errorMessage.validateField(validation.validatePassword(value),
                    {
                        name: this.#context.fields.password.popUpName,
                        errorID: this.#context.fields.password.errorID,
                    }, 'userpage__popUp__error');
                break;
            case this.#context.fields.repeatPassword.popUpName:
                isValid &= errorMessage.validateField(validation.validateRepeatPassword(value),
                    {
                        name: this.#context.fields.repeatPassword.popUpName,
                        errorID: this.#context.fields.repeatPassword.errorID,
                    }, 'userpage__popUp__error');
                break;
            case this.#context.fields?.phone?.name:
                isValid &= errorMessage.validateField(validation.validatePhone(value),
                    this.#context.fields.name);
                break;
            }
        });
        return isValid;
    }

    /**
     * Метод, реализующий получение данных пользователя.
     */
    async _getData() {
        const [status, response] = await request.makeGetRequest(config.api.profile)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames.name, response.username);
            this._storage.set(this._storeNames.email, response.email);
            this._storage.set(this._storeNames.phone, response.phone);
            if (!!response.avatar && response.avatar !== '') {
                this._storage.set(this._storeNames.avatar, response.avatar);
            } else {
                this._storage.set(this._storeNames.avatar, 'img/UserPhoto.png');
            }
            console.log(response.paymentmethods);
            response.paymentmethods.forEach((mehtod, key) => {
                const date = new Date(mehtod.expirydate);
                response.paymentmethods[key].expiry =
                    (date.getUTCMonth() / 10).toString()
                        .replace('.', '') +
                    '/' + date.getUTCFullYear() % 100;
            });

            this._storage.set(this._storeNames.paymentMethods, response.paymentmethods ?? []);
            this._storage.set(this._storeNames.address, response.address ?? []);
        }
    }

    /**
     * Метод, реализующий сохранение данных профиля.
     * @param {object} data данные для изменения
     */
    async _saveEditData(data) {
        const userData = this.#collectUserData();
        const dataForVal = {};
        dataForVal[this.#context.fields[data.id].popUpName] = data.value;
        if (!this.#validate(dataForVal)) {
            this._storage.set(this._storeNames.responseCode, config.states.invalidUserData);
            return;
        }
        switch (data.id) {
        case 'name':
            userData.username = data.value;
            break;
        case 'email':
            userData.email = data.value;
            break;
        case 'phone':
            userData.phone = data.value;
            break;
        case 'password':
            userData.password = data.value;
            const [status] = await request.makePostRequest(config.api.password, userData)
                .catch((err) => console.log(err));
            this._storage.set(this._storeNames.responseCode, status);
            return;
        }
        const [status] = await request.makePostRequest(config.api.profile, userData)
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.temp, data);
        this._storage.set(this._storeNames.responseCode, status);
    }

    /**
     * Метод, реализующий загрузку аватара.
     * @param {Blob} avatar
     */
    async _uploadAvatar(avatar) {
        const [status] = await request.makePostRequestSendAva(
            config.api.uploadAvatar, avatar ?? 'img/UserPhoto.png')
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            if (avatar) {
                this._storage.set(this._storeNames.avatar,
                    URL.createObjectURL(avatar));
            } else {
                this._storage.set(this._storeNames.avatar,
                    'img/UserPhoto.png');
            }
        }
    }

    /**
     * Метод, собирающий данные пользователя
     * @return {object} данные
     */
    #collectUserData() {
        const paymentMethodsField = this._storage.get(this._storeNames.paymentMethods);
        paymentMethodsField.forEach(
            (paymentMethod, key) =>
                paymentMethodsField[key].id = Number((paymentMethod.id).toString().split('/')[1]));

        const addressField = this._storage.get(this._storeNames.address);
        addressField.forEach(
            (address, key) =>
                addressField[key].id = Number((address.id).toString().replace('addressCard/', '')),
        );
        return {
            username: this._storage.get(this._storeNames.name),
            email: this._storage.get(this._storeNames.email),
            phone: this._storage.get(this._storeNames.phone),
            avatar: this._storage.get(this._storeNames.avatar),
            paymentMethods: paymentMethodsField,
            address: addressField,
        };
    }

    /**
     * Метод, реализующий отправку данных для карт профиля.
     * @param {object} data - данные для обработки
     * @param {object} field - название поля
     */
    async #makePostRequestCard(data, field) {
        const [status] = await request.makePostRequest(config.api.profile, data)
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames[field], data[field]);
        }
    }

    /**
     * Функция, реализующая валидацию полей карты.
     * @param {object} data - данные для обработки
     * @return {string} errorMessage - сообщение об ошибке
     */
    #validateCard(data) {
        if (data.expiry.length !== 5 ||
            !/^\d+$/.test(data.expiry.slice(0, 2)) ||
            !/^\d+$/.test(data.expiry.slice(-2))) {
            return 'Срок действия карты формата 09/25';
        }
        if (Number(data.expiry.slice(0, 2)) > 12) {
            return 'Месяц не может быть больше 12';
        }
        if (Number(data.expiry.slice(-2)) < new Date().getFullYear() % 100 ||
            (Number(data.expiry.slice(-2)) === new Date().getFullYear() % 100 &&
                Number(data.expiry.slice(0, 2)) < new Date().getMonth())) {
            return 'Срок действия карты истек';
        }
        if (data.cvc.length !== 3 || !/^\d+$/.test(data.cvc)) {
            return 'CVC код содержит 3 цифры';
        }
        if (data.number.length !== 16 || !/^\d+$/.test(data.number)) {
            return 'Номер карты состоит из 16 цифр. ' + data.number.length + '/16';
        }
        return '';
    }

    /**
     * Метод, реализующий сохранение карты.
     * @param {object} data - данные для обработки
     */
    async _saveAddCard(data) {
        const userData = this.#collectUserData();
        const errorMessage = this.#validateCard(data);
        if (errorMessage) {
            this._storage.set(this._storeNames.errorMessage, errorMessage);
            this._storage.set(this._storeNames.responseCode, config.states.invalidData);
        } else {
            delete data.cvc;
            userData.paymentMethods.forEach((item) => delete item.priority);
            data.id = userData.paymentMethods.length;
            data.priority = true;
            data.expiryDate = data.expiry.split('/');
            data.expiryDate = new Date(20 + data.expiryDate[1], data.expiryDate[0] + 1);
            userData.paymentMethods.push(data);

            await this.#makePostRequestCard(userData, 'paymentMethods');
        }
    }

    /**
     * Метод, реализующий удаление способа оплаты.
     * @param {int} id - идентификатор элемента
     */
    async _saveDeleteCard(id) {
        const userData = this.#collectUserData();
        userData.paymentMethods.forEach((item, key) => {
            if (item.id === id) {
                delete userData.paymentMethods[key];
            }
        });
        await this.#makePostRequestCard(userData, 'paymentMethods');
    }

    /**
     * Функция, реализующая валидацию полей карты.
     * @param {object} data - данные для обработки
     * @return {string} errorMessage - сообщение об ошибке
     */
    #validateAddress(data) {
        if (!data.city.length) {
            return 'Введите ваш город';
        }
        if (!data.street.length) {
            return 'Введите вашу улицу';
        }
        if (!data.house.length) {
            return 'Введите ваш дом';
        }
        return '';
    }
    /**
     * Метод, реализующий добавление карты адреса.
     * @param {object} data - данные для обработки
     */
    async _saveAddAddress(data) {
        const userData = this.#collectUserData();
        const errorMessage = this.#validateAddress(data);
        if (errorMessage !== '') {
            this._storage.set(this._storeNames.errorMessage, errorMessage);
            this._storage.set(this._storeNames.responseCode, config.states.invalidData);
        } else {
            data.id = userData.address.length;
            userData.address.forEach((item) => delete item.priority);
            data.priority = true;
            userData.address.push(data);

            await this.#makePostRequestCard(userData, 'address');
        }
    }

    /**
     * Метод, реализующий изменение карты адреса.
     * @param {object} data - данные для обработки
     */
    async _saveEditAddress(data) {
        const userData = this.#collectUserData();
        const errorMessage = this.#validateAddress(data);
        if (errorMessage !== '') {
            this._storage.set(this._storeNames.errorMessage, errorMessage);
            this._storage.set(this._storeNames.responseCode, config.states.invalidData);
        } else {
            userData.address.forEach((item, key) => {
                if (item.id === data.id) {
                    data.priority = item.priority;
                    userData.address[key] = data;
                }
            });
            await this.#makePostRequestCard(userData, 'address');
        }
    }

    /**
     * Метод, реализующий удаление карты адреса.
     * @param {int} id - идентификатор элемента
     */
    async _deleteAddress(id) {
        const userData = this.#collectUserData();
        userData.address.forEach((item, key) => {
            if (item.id === id) {
                delete userData.address[key];
            }
        });
        await this.#makePostRequestCard(userData, 'address');
    }
}

export default new UserStore();
