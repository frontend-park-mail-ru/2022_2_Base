/**
 * Класс, реализующий отрисовку ошибок.
 */
 export default class ErrorMessage {
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
};
