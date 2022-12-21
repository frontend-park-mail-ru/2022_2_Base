import BaseStore from './BaseStore';
import {UserActionTypes} from '../actions/user';
import {ProfileActionTypes} from '../actions/profile';
import request from '../modules/ajax';
import {config} from '../config';
import {cartAction} from '../actions/cart';
import {userStoreDataCollection} from '../../../types/aliases';
import {userStoreCollectDataFields} from '../../../types/tuples';

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
                popUpName: 'password__popUp',
                fieldName: 'password__popUp',
                popUpNameNew: 'password__2__popUp',
                fieldNameNew: 'password__2__popUp',
                placeholder: 'Введите пароль',
                maxLength: '16',
                errorID: 'passwordError',
            },
            repeatPassword: {
                title: 'Повторить пароль',
                type: 'password',
                name: 'repeatPassword',
                popUpName: 'password__3__popUp',
                fieldName: 'password__3__popUp',
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
        email: 'email',
        phone: 'phone',
        password: 'password',
        context: 'context',
        avatar: 'avatar',
        paymentMethods: 'paymentMethods',
        address: 'address',
        temp: 'temp',
        isValid: 'isValid',
        errorMessage: 'ErrorMessage',
        csrf: 'csrf',
    };

    /**
     * constructor
     */
    constructor() {
        super();
        this._storage = new Map();
        this._storage.set(this._storeNames.isAuth, false);
        this._storage.set(this._storeNames.responseCode, null);
        this._storage.set(this._storeNames.name, null);
        this._storage.set(this._storeNames.email, null);
        this._storage.set(this._storeNames.phone, null);
        this._storage.set(this._storeNames.avatar, 'img/UserPhoto.webp');
        this._storage.set(this._storeNames.paymentMethods, []);
        this._storage.set(this._storeNames.address, []);
        this._storage.set(this._storeNames.context, this.#context);
        this._storage.set(this._storeNames.isValid, null);
        this._storage.set(this._storeNames.errorMessage, '');
        this._storage.set(this._storeNames.csrf, null);
    }

    /**
     * Метод, реализующий реакцию на рассылку Диспетчера.
     * @param payload - полезная нагрузка запроса
     */
    override async _onDispatch(payload: dispatcherPayload) {
        switch (payload.actionName) {
        case UserActionTypes.USER_FETCH:
            await this._fetchUser();
            this._emitChange([UserActionTypes.USER_FETCH]);
            break;

        case UserActionTypes.USER_REGISTER:
            await this._signup(payload.data);
            this._emitChange([UserActionTypes.USER_REGISTER]);
            break;

        case UserActionTypes.USER_LOGIN:
            await this._login(payload.data);
            this._emitChange([UserActionTypes.USER_LOGIN]);
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
        const [status, response, headers] = await request.makeGetRequest(config.api.session)
            .catch((err) => console.log(err)) ?? [];
        this._storage.set(this._storeNames.csrf, response);
        this._storage.set(this._storeNames.responseCode, status);

        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames.isAuth, true);
            this._storage.set(this._storeNames.csrf, headers.get('csrf'));
        }
    }

    /**
     * Метод, реализующий выход из сессии.
     */
    async _logout() {
        const [status] = await request.makeDeleteRequest(config.api.logout)
            .catch((err) => console.log(err)) ?? [];

        this._storage.set(this._storeNames.responseCode, status);

        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames.isAuth, false);
            cartAction.resetCart();
            this._storage.set(this._storeNames.csrf, null);
        }
    }

    /**
     * Метод, реализующий авторизацию.
     * @param path - путь запроса
     * @param data - данные для авторизации
     */
    async #auth(path: string, data: object) {
        const [status, response, headers] = await request.makePostRequest(path, data)
            .catch((err) => console.log(err)) ?? [];
        this._storage.set(this._storeNames.csrf, response);
        this._storage.set(this._storeNames.responseCode, status);

        if (status === config.responseCodes.code201) {
            this._storage.set(this._storeNames.isAuth, true);
            this._storage.set(this._storeNames.csrf, headers.get('csrf'));
        }
    }

    /**
     * Метод, реализующий регистрацию.
     * @param data - данные для входа
     */
    async _signup(data: userStoreDataCollection) {
        const {username, email, password} = data;
        await this.#auth(config.api.signup, {
            password,
            email,
            username,
        });
    }

    /**
     * Метод, реализующий вход в сессию.
     * @param data - данные для входа
     */
    async _login(data: userStoreDataCollection) {
        const {email, password} = data;
        await this.#auth(config.api.login, {
            password,
            email,
        });
    }

    /**
     * Метод, реализующий получение данных пользователя.
     */
    async _getData() {
        if (this._storage.get(this._storeNames.isAuth)) {
            const [status, response] = await request.makeGetRequest(config.api.profile)
                .catch((err) => console.log(err)) ?? [];
            this._storage.set(this._storeNames.responseCode, status);
            if (status === config.responseCodes.code200) {
                this._storage.set(this._storeNames.name, response.username);
                this._storage.set(this._storeNames.email, response.email);
                this._storage.set(this._storeNames.phone, response.phone);
                if (!!response.avatar && response.avatar !== config.states.noAvatar) {
                    this._storage.set(this._storeNames.avatar, response.avatar);
                } else {
                    this._storage.set(this._storeNames.avatar, 'img/UserPhoto.webp');
                }

                if (response.paymentmethods) {
                    response.paymentmethods.forEach((method: PaymentCardObj, key: string) => {
                        const date = new Date(method.expirydate ?? new Date());
                        response.paymentmethods[key].expiry =
                            ('0' + (date.getMonth() + 1)).slice(-2) +
                            '/' + date.getUTCFullYear() % 100;
                    });
                } else {
                    response.paymentmethods = [];
                }
                this._storage.set(this._storeNames.paymentMethods, response.paymentmethods ?? []);
                this._storage.set(this._storeNames.address, response.address ?? []);
            }
        } else {
            this._storage.set(this._storeNames.responseCode, config.responseCodes.code401);
        }
    }

    /**
     * Метод, реализующий сохранение данных профиля.
     * @param data - данные для изменения
     */
    async _saveEditData(data: userInfoPopUp) {
        const userData = this.#collectUserData();
        switch (data.id) {
        case 'name':
            userData.username = data.value;
            this._storage.set(this._storeNames.name, data.value);
            break;
        case 'email':
            userData.email = data.value;
            this._storage.set(this._storeNames.email, data.value);
            break;
        case 'phone':
            userData.phone = data.value;
            this._storage.set(this._storeNames.phone, data.value);
            break;
        case 'password': {
            const [status] = await request.makePostRequest(config.api.password, {
                oldpassword: data.value,
                newpassword: data.newValue,
            }).catch((err) => console.log(err)) ?? [];
            this._storage.set(this._storeNames.responseCode, status);
            return;
        }
        }
        const [status] = await request.makePostRequest(config.api.profile, userData)
            .catch((err) => console.log(err)) ?? [];

        this._storage.set(this._storeNames.temp, data);
        this._storage.set(this._storeNames.responseCode, status);
    }

    /**
     * Метод, реализующий загрузку аватара.
     * @param avatar - фото
     */
    async _uploadAvatar(avatar: Blob | null) {
        const [status] = avatar ?
            await request.makePostRequestSendAvatar(
                config.api.uploadAvatar, avatar)
                .catch((err) => console.log(err)) ?? [] :
            await request.makePostRequest(
                config.api.profile, {avatar: config.states.noAvatar})
                .catch((err) => console.log(err)) ?? [];

        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            if (avatar) {
                this._storage.set(this._storeNames.avatar,
                    URL.createObjectURL(avatar));
            } else {
                this._storage.set(this._storeNames.avatar,
                    'img/UserPhoto.webp');
            }
        }
    }

    /**
     * Метод, собирающий данные пользователя
     * @returns данные о пользователе
     */
    #collectUserData() {
        const paymentMethodsField = this._storage.get(this._storeNames.paymentMethods);
        paymentMethodsField.forEach(
            (paymentMethod: PaymentCardObj, key: string) =>
                paymentMethodsField[key].id = Number((paymentMethod.id).toString().split('/')[1]));

        const addressField = this._storage.get(this._storeNames.address);
        addressField.forEach(
            (address: addressCardObj, key: string) =>
                addressField[key].id = Number((address.id).toString().replace('addressCard/', '')),
        );
        return {
            username: this._storage.get(this._storeNames.name) as string,
            email: this._storage.get(this._storeNames.email) as string,
            phone: this._storage.get(this._storeNames.phone) as string,
            avatar: this._storage.get(this._storeNames.avatar) as string | Blob,
            paymentMethods: paymentMethodsField as Array<PaymentCardObj>,
            address: addressField as Array<addressCardObj>,
        } as userStoreDataCollection;
    }

    /**
     * Метод, реализующий отправку данных для карт профиля.
     * @param data - данные для обработки
     * @param field - название поля
     */
    async #makePostRequestCard(data: userStoreDataCollection, field: userStoreCollectDataFields) {
        const [status] = await request.makePostRequest(config.api.profile, data)
            .catch((err) => console.log(err)) ?? [];

        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames[field], data[field]);
        }
    }

    /**
     * Метод, реализующий сохранение карты.
     * @param data - данные для обработки
     */
    async _saveAddCard(data: PaymentCardObj) {
        const userData = this.#collectUserData();
        delete data.cvc;
        userData.paymentMethods.forEach((item: PaymentCardObj) => delete item.priority);
        data.id = config.states.noPayCardId;
        data.priority = true;
        data.type = 'Card';
        data.expirydate = new Date(2000 + Number(data.expiry.split('/')[1]),
            Number(data.expiry.split('/')[0]));
        userData.paymentMethods.push(data);

        await this.#makePostRequestCard(userData, 'paymentMethods');
    }

    /**
     * Метод, реализующий удаление способа оплаты.
     * @param id - идентификатор элемента
     */
    async _saveDeleteCard(id: number) {
        const userData = this.#collectUserData();
        userData.paymentMethods = userData.paymentMethods
            .filter((item: PaymentCardObj) => item.id !== id);
        await this.#makePostRequestCard(userData, 'paymentMethods');
    }

    /**
     * Метод, реализующий добавление карты адреса.
     * @param data - данные для обработки
     */
    async _saveAddAddress(data: addressCardObj) {
        const userData = this.#collectUserData();
        data.id = config.states.noPayCardId;
        userData.address.forEach((item: addressCardObj) => delete item.priority);
        data.priority = true;
        userData.address.push(data);

        await this.#makePostRequestCard(userData, 'address');
    }

    /**
     * Метод, реализующий изменение карты адреса.
     * @param data - данные для обработки
     */
    async _saveEditAddress(data: addressCardObj) {
        const userData = this.#collectUserData();
        userData.address.forEach((item: addressCardObj, key: number) => {
            if (item.id === data.id) {
                data.priority = item.priority;
                userData.address[key] = data;
            }
        });
        await this.#makePostRequestCard(userData, 'address');
    }

    /**
     * Метод, реализующий удаление карты адреса.
     * @param id - идентификатор элемента
     */
    async _deleteAddress(id: number) {
        const userData = this.#collectUserData();
        userData.address = userData.address.filter((item: addressCardObj) => item.id !== id);
        await this.#makePostRequestCard(userData, 'address');
    }
}

export default new UserStore();
