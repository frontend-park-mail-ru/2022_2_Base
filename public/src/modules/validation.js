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
        if (data === "") {
            return {status: false, message: 'Поле обязательно должно быть заполнено'};
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
        if (data === "") {
            return {status: false, message: 'Поле обязательно должно быть заполнено'};
        }
        if (data.length < 6) {
            return {status: false, message: 'Должен содержать минимум 6 символов'};
        }
        return {status: true, message: ''};
    };

    /**
     * Метод, проверяющий, прошла ли валидация данных успешно
     * @param {string} email - e-mail для валидации
     * @param {string} password - пароль для валидации
     * @param {string} anotherPassword - дублированный пароль для валидации
     * @return {boolean} - boolean значение, зависящее от успешности валидации данных
     */
    validateRegFields = (email, password, anotherPassword = password) => {
        return ((password === anotherPassword) && (this.validateEMail(email).status) &&
            (this.validatePassword(password).status));
    };
};
