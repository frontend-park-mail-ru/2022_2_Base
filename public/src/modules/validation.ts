import errorMessage from './ErrorMessage';
import userStore from '../stores/UserStore';
import {RecordString} from '../../../types/tuples';

const emailRegex = /@/;
const stringRegex = /^[a-z0-9 а-яА-ЯёЁ!?()_/-]+$/i;

/**
 * Класс, реализующий валидацию форм.
 */
class Validation {
    /**
     * Метод, валидирующий e-mail.
     * @param data - e-mail для валидации
     * @returns объект с полем статуса проверки status и полем сообщением ошибки message
     */
    validateEMail(data: string) {
        const checkEmpty = this.checkEmptyField(data);
        if (!checkEmpty.status) {
            return checkEmpty;
        }
        if (!(emailRegex).test(data)) {
            return {status: false, message: 'Неверный формат почты'};
        }
        if (data.length > 30) {
            return {status: false, message: 'Почта может содержать максимум 30 символов'};
        }
        return {status: true, message: ''};
    }

    /**
     * Метод, валидирующий номер телефона.
     * @param phone - номер для валидации
     * @returns объект с полем статуса проверки status и полем сообщением ошибки message
     */
    validatePhone(phone: string) {
        const checkEmpty = this.checkEmptyField(phone);
        if (!checkEmpty.status) {
            return checkEmpty;
        }
        if (phone.length !== 11 || !/^\d+$/.test(phone)) {
            return {status: false,
                message: `Телефон должен содержать 11 цифр. Введено ${phone.length}/11`};
        }
        return {status: true, message: ''};
    }

    /**
     * Метод, валидирующий пароль.
     * @param data - пароль для валидации
     * @returns объект с полем статуса проверки status
     * и полем сообщением ошибки message
     */
    validatePassword = (data: string) => {
        const checkEmpty = this.checkEmptyField(data);
        if (!checkEmpty.status) {
            return checkEmpty;
        }
        if (data.length < 6) {
            return {status: false, message: 'Пароль должен содержать минимум 6 символов'};
        }
        if (data.length > 16) {
            return {status: false, message: 'Пароль должен содержать максимум 16 символов'};
        }
        return {status: true, message: ''};
    };

    /**
     * Метод, валидирующий повторный ввод пароля.
     * @param isValid - совпадают ли пароли
     * @returns объект с полем статуса проверки status
     * и полем сообщением ошибки message
     */
    validateRepeatPassword(isValid: boolean) {
        return (isValid ? {status: true, message: ''} :
            {status: false, message: 'Введенные пароли не совпадают'});
    }

    /**
     * Метод, проверяющий пустые поля.
     * @param data - данные для валидации
     * @returns объект с полем статуса проверки status
     * и полем сообщением ошибки message
     */
    checkEmptyField(data: string) {
        if (data.length === 0) {
            return {status: false, message: 'Поле обязательно должно быть заполнено'};
        }
        return {status: true, message: ''};
    }

    /**
     * Функция, реализующая валидацию полей карты.
     * @param data - данные карты для обработки
     * @returns errorMessage - сообщение об ошибке
     */
    validateCard(data: PaymentCardObj) {
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
        if (data.cvc?.length !== 3 || !/^\d+$/.test(data.cvc)) {
            return 'CVC код содержит 3 цифры';
        }
        if (data.number.length !== 16 || !/^\d+$/.test(data.number)) {
            return 'Номер карты состоит из 16 цифр. ' + data.number.length + '/16';
        }
        return '';
    }

    /**
     * Функция, реализующая валидацию полей карты.
     * @param data - данные для обработки
     * @returns errorMessage - сообщение об ошибке
     */
    validateAddress(data: addressCardObj) {
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
     * Функция, реализующая валидацию полей карты.
     * @param searchString - данные для обработки
     * @param isSuggest - проверяем ли мы для показа подсказки
     * @returns errorMessage - сообщение об ошибке
     */
    validateSearchField(searchString: string, isSuggest = false) {
        if (!searchString) {
            return null;
        }
        if (searchString.length < 3 && !isSuggest) {
            return 'Введите не меньше 3 символов';
        }
        if (this.validateString(searchString)) {
            return 'Введены недопустимые символы';
        }
        return '';
    }

    /**
     * Функция, реализующая валидацию входной строки.
     * @param inputString - входная строка
     * @returns validateRes - результат валидации, true, то найдены недопустимые символы
     */
    validateString(inputString: string) {
        return (!stringRegex.test(inputString));
    }

    /**
     * Функция, реализующая валидацию поля для ввода промокода.
     * @param promocodeString - данные для обработки
     * @returns errorMessage - сообщение об ошибке
     */
    validatePromocodeField(promocodeString: string) {
        if (!promocodeString) {
            return 'Введите промокод';
        }

        if (this.validateString(promocodeString)) {
            return 'Введены недопустимые символы';
        }
        return '';
    }

    /**
     * Метод, осуществляющий валидацию данных из формы.
     * @param data - объект, содержащий данные из формы
     * @returns статус валидации
     */
    validate(data: RecordString) {
        const context = userStore.getContext(userStore._storeNames.context);
        let isValid= true;
        Object.entries(data).forEach(([key, value]) => {
            switch (key) {
            case context.fields.name.name:
                isValid = isValid && errorMessage.validateField(this.checkEmptyField(value),
                    context.fields.name, 'login__form__error');
                break;
            case context.fields.email.name:
                isValid = isValid && errorMessage.validateField(this.validateEMail(value),
                    context.fields.email, 'login__form__error');
                break;
            case context.fields.password.name:
                isValid = isValid && errorMessage.validateField(this.validatePassword(value),
                    context.fields.password, 'login__form__error');
                break;
            case context.fields.repeatPassword.name:
                isValid = isValid && errorMessage.validateField(this
                    .validateRepeatPassword(data.password === data.repeatPassword),
                context.fields.repeatPassword, 'login__form__error');
                break;
            case context.fields.name.popUpName:
                isValid = isValid && errorMessage.validateField(this.checkEmptyField(value),
                    {
                        name: context.fields.name.popUpName,
                        errorID: context.fields.name.errorID,
                    }, 'userpage__popUp__error');
                break;
            case context.fields.email.popUpName:
                isValid = isValid && errorMessage.validateField(this.validateEMail(value),
                    {
                        name: context.fields.email.popUpName,
                        errorID: context.fields.email.errorID,
                    }, 'userpage__popUp__error');
                break;
            case context.fields.phone.popUpName:
                isValid = isValid && errorMessage.validateField(this.validatePhone(value),
                    {
                        name: context.fields.phone.popUpName,
                        errorID: context.fields.phone.errorID,
                    }, 'userpage__popUp__error');
                break;
            case context.fields.password.popUpName:
                isValid = isValid && errorMessage.validateField(this.validatePassword(value),
                    {
                        name: context.fields.password.popUpName,
                        errorID: context.fields.password.errorID,
                    }, 'userpage__popUp__error');
                break;
            case context.fields.repeatPassword.popUpName:
                isValid = isValid && errorMessage.validateField(
                    this.validateRepeatPassword(data.password === data.repeatPassword),
                    {
                        name: context.fields.repeatPassword.popUpName,
                        errorID: context.fields.repeatPassword.errorID,
                    }, 'userpage__popUp__error');
                break;
            case context.fields?.phone?.name:
                isValid = isValid && errorMessage.validateField(this.validatePhone(value),
                    context.fields.name);
                break;
            }
        });
        return isValid;
    }
}

export default new Validation();
