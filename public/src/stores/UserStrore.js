import BaseStore from './BaseStore.js';
import {UserActionTypes} from '../actions/user.js';
import {ProfileActionTypes} from '../actions/profile.js';
import request from '../modules/ajax.js';
import {config} from '../config.js';
import errorMessage from '../modules/ErrorMessage.js';
import validation from '../modules/validation.js';

// import {re} from '@babel/core/lib/vendor/import-meta-resolve';

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
            priority: true,
            number: '123456******1234',
            type: 'MIR',
            expiryDate: '12/24',
            id: 1,
        },
        {
            number: '123456******5678',
            type: 'MIR',
            expiryDate: '02/25',
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
            id: `${String(1)}`, // addressCard/
        },
        {
            city: 'г. Москва',
            street: 'улица Бассейная',
            house: '228',
            flat: '420',
            id: `${String(2)}`,
        },
    ];

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
        isValid: 'isValid',
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
        this._storage.set(this._storeNames.paymentMethods, []); // this.#testPaymentCards
        this._storage.set(this._storeNames.address, []); // this.#testAddressCards
        this._storage.set(this._storeNames.context, this.#context);
        this._storage.set(this._storeNames.isValid, null);
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

        if (status === config.responseCodes.code201) {
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

        if (status === config.responseCodes.code201) {
            this._storage.set(this._storeNames.isAuth, true);
        }
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
            case this.#context.fields.phone.name:
                isValid &= errorMessage.validateField(validation.validatePhone(value),
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
            this._storage.set(this._storeNames.avatar, response.avatar);
            this._storage.set(this._storeNames.paymentMethods, response.paymentMethods ?? []);
            this._storage.set(this._storeNames.address, response.address ?? []);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Метод, реализующий сохранение данных профиля.
     * @param {object} data данные для изменения
     */
    async _saveEditData(data) {
        const userData = this.#collectUserData();
        const dataForVal = {};
        switch (data.id) {
        case 'name':
            dataForVal[this.#context.fields.name.popUpName] = data.value;
            if (this.#validate(dataForVal)) {
                userData.username = data.value;
            } else {
                this._storage.set(this._storeNames.responseCode, 4000);
                return;
            }

            break;
        case 'email':
            dataForVal[this.#context.fields.email.popUpName] = data.value;
            if (this.#validate(dataForVal)) {
                userData.email = data.value;
            } else {
                this._storage.set(this._storeNames.responseCode, 4000);
                return;
            }

            break;
        case 'phone':
            dataForVal[this.#context.fields.phone.popUpName] = data.value;
            if (this.#validate(dataForVal)) {
                userData.phone = data.value;
            } else {
                this._storage.set(this._storeNames.responseCode, 4000);
                return;
            }

            break;
        case 'password':
            const repeatPasswordField = document.getElementById(
                this.#context.fields.repeatPassword.fieldName);
            if (repeatPasswordField) {
                dataForVal[this.#context.fields.repeatPassword.popUpName] =
                        repeatPasswordField.value === data.value;
            } else {
                console.log('Элемент не найден: ', repeatPasswordField);
                return;
            }

            dataForVal[this.#context.fields.password.popUpName] = data.value;
            const isValid = this.#validate(dataForVal);
            if (isValid) {
                userData.password = data.value;
                const [status] = await request.makePostRequest(config.api.password, userData)
                    .catch((err) => console.log(err));
                this._storage.set(this._storeNames.responseCode, status);
            } else {
                this._storage.set(this._storeNames.responseCode, 4000);
            }
            return;
        }
        console.log(userData);
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
        const [status] = await request.makePostRequestSendAva(config.api.uploadAvatar, avatar)
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
     * Метод, собирающий данные пользователя
     * @return {object} данные
     */
    #collectUserData() {
        return {
            username: this._storage.get(this._storeNames.name),
            email: this._storage.get(this._storeNames.email),
            phone: this._storage.get(this._storeNames.phone),
            avatar: this._storage.get(this._storeNames.avatar),
            paymentmethods: this._storage.get(this._storeNames.paymentMethods),
            adress: this._storage.get(this._storeNames.address),
        };
    }

    /**
     * Метод, реализующий сохранение карты.
     * @param {object} data - данные для обработки
     */
    async _saveAddCard(data) {
        const userData = this.#collectUserData();
        delete data.cvc;
        data.id = userData.paymentmethods.length;
        userData.paymentmethods.forEach((item) => delete item.priority);
        data.priority = true;
        userData.paymentmethods.push(data);

        const [status] = await request.makePostRequest(config.api.profile, JSON.stringify(userData))
            .catch((err) => console.log(err));

        console.log(JSON.stringify(userData));
        console.log(userData.paymentmethods);
        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames.paymentMethods, userData.paymentmethods);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Метод, реализующий удаление способа оплаты.
     * @param {int} id - идентификатор элемента
     */
    async _saveDeleteCard(id) {
        const userData = this.#collectUserData();
        userData.paymentmethods.forEach((item, key) => {
            if (item.id === id) {
                delete userData.paymentmethods[key];
            }
        });
        const [status] = await request.makePostRequest(config.api.profile, JSON.stringify(userData))
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200 ) {
            this._storage.set(this._storeNames.paymentMethods, userData.paymentmethods);
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
        const userData = this.#collectUserData();
        data.id = userData.adress.length;
        userData.adress.forEach((item) => delete item.priority);
        data.priority = true;
        userData.adress.push(data);

        const [status] = await request.makePostRequest(config.api.profile, JSON.stringify(userData))
            .catch((err) => console.log(err));

        console.log(JSON.stringify(userData));
        console.log(userData.adress);
        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200 ) {
            this._storage.set(this._storeNames.address, userData.adress);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Метод, реализующий изменение карты адреса.
     * @param {object} data - данные для обработки
     */
    async _saveEditAddress(data) {
        const userData = this.#collectUserData();

        userData.adress.forEach((item, key) => {
            if (item.id === data.id) {
                data.priority = item.priority;
                userData.adress[key] = data;
            }
        });

        const [status] = await request.makePostRequest(config.api.profile, JSON.stringify(userData))
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200 ) {
            this._storage.set(this._storeNames.address, userData.adress);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Метод, реализующий удаление карты адреса.
     * @param {int} id - идентификатор элемента
     */
    async _deleteAddress(id) {
        const userData = this.#collectUserData();
        userData.adress.forEach((item, key) => {
            if (item.id === id) {
                delete userData.adress[key];
            }
        });

        const [status] = await request.makePostRequest(config.api.profile, JSON.stringify(userData))
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200 ) {
            this._storage.set(this._storeNames.address, userData.adress);
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
