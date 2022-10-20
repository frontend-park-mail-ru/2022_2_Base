const emailRegex = /@/;

/**
 * Класс, реализующий валидацию форм.
 */
export default class Validation {
    /**
     * Метод, валидирующий e-mail.
     * @param {string} data - e-mail для валидации
     * @return {{status: boolean, message: String}} - объект со полем статуса проверки status
     * и полем сообщением ошибки message
     */
    validateEMail = (data) => {
        const checkEmpty = this.checkEmptyField(data);
        if (!checkEmpty.status) {
            return checkEmpty;
        }
        if (!(emailRegex).test(data)) {
            return {status: false, message: 'Неверный формат почты'};
        }
        return {status: true, message: ''};
    };

    /**
     * Метод, валидирующий пароль.
     * @param {string} data - пароль для валидации
     * @return {{status: boolean, message: String}} - объект со полем статуса проверки status
     * и полем сообщением ошибки message
     */
    validatePassword = (data) => {
        const checkEmpty = this.checkEmptyField(data);
        if (!checkEmpty.status) {
            return checkEmpty;
        }
        if (data.length < 6) {
            return {status: false, message: 'Должен содержать минимум 6 символов'};
        }
        return {status: true, message: ''};
    };

    /**
     * Метод, проверяющий пустые поля.
     * @param {string} data - данные для валидации
     * @return {{status: boolean, message: String}} - объект со полем статуса проверки status
     * и полем сообщением ошибки message
     */
    checkEmptyField = (data) => {
        if (data.length === 0) {
            return {status: false, message: 'Поле обязательно должно быть заполнено'};
        }
        return {status: true, message: ''};
    };
};
