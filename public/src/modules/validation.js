const emailRegex = /@/;

/**
 * Класс, реализующий валидацию форм.
 */
export default class Validation {
    /**
     * Метод, который отрисовывает сообщение об ошибке ввода
     * @param {object} target - HTML-элемент, после которого будет осуществлена отрисовка
     * @param {string} nameId - id HTML-элемента, который будет отрисован
     * @param {string} message - сообщение для отрисовки
     */
    getErrorMessage = (target, nameId, message) => {
        const div = document.createElement('div');
        div.id = nameId;
        const span = document.createElement('span');
        div.appendChild(span);
        div.classList.add('input-field-error');
        span.classList.add('input-field-error__text');
        span.innerHTML = message;
        target.after(div);
    };

    /**
     * Метод, который отрисовывает сообщение об ошибке сервера.
     * @param {object} target - HTML-элемент, после которого будет осуществлена отрисовка
     * @param {string} nameId - id HTML-элемента, который будет отрисован
     * @param {string} message - сообщение для отрисовки
     */
    getServerMessage = (target, nameId, message) => {
        const div = document.createElement('div');
        div.id = nameId;
        const span = document.createElement('span');
        div.appendChild(span);
        div.classList.add('server-error');
        span.classList.add('server-error__text');
        span.innerHTML = message;
        target.before(div);
    };

    /**
     * Метод, валидирующий e-mail.
     * @param {string} data - e-mail для валидации
     * @return {{status: boolean, message: String}} - объект со полем статуса проверки status
     * и полем сообщением ошибки message
     */
    validateEMail = (data) => {
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
