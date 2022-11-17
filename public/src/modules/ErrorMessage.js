/**
 * Класс, реализующий отрисовку ошибок.
 */
class ErrorMessage {
    /**
     * Метод, который отрисовывает сообщение об ошибке ввода
     * @param {object} target - HTML-элемент, после которого будет осуществлена отрисовка
     * @param {string} nameId - id HTML-элемента, который будет отрисован
     * @param {string} message - сообщение для отрисовки
     * @param {String} additionalClasses - классы, которые необходимо добавить к сообщению об ошибке
     */
    getErrorMessage(target, nameId, message, additionalClasses = null) {
        const errorMsg = document.getElementById(nameId + 'Error');
        if (!errorMsg) {
            const div = document.createElement('div');
            div.id = nameId + 'Error';
            const span = document.createElement('span');
            div.appendChild(span);
            if (additionalClasses) {
                div.classList.add(additionalClasses);
            }
            div.classList.add('input-field-error');
            span.classList.add('input-field-error__text');
            span.id = 'error-text';
            span.innerHTML = message;
            target.after(div);
        }
    };

    /**
     * Метод, удаляющий сообщение об ошибке при фокусе на поле ввода
     * @param {object} nameId название поля
     */
    deleteErrorMessage(nameId) {
        if (document.getElementById(nameId + 'Error')) {
            document.getElementById(nameId + 'Error').remove();
        }
    };

    /**
     * Метод, который отрисовывает сообщение об ошибке сервера.
     * @param {object} target - HTML-элемент, после которого будет осуществлена отрисовка
     * @param {string} nameId - id HTML-элемента, который будет отрисован
     * @param {string} message - сообщение для отрисовки
     */
    getServerMessage(target, nameId, message) {
        const div = document.createElement('div');
        div.id = nameId;
        const span = document.createElement('span');
        div.appendChild(span);
        div.classList.add('server-error');
        span.classList.add('server-error__text');
        span.innerText = message;
        target.before(div);
    }

    /**
     * Метод, показывающий ошибку
     */
    getAbsoluteErrorMessage() {
        const errorElement = document.getElementById('header_error-message').style.display = 'flex';
        // setTimeout(((errorElement) => {
        //     return () => errorElement.style.display = 'none';
        // })(errorElement), 600);
        setTimeout(() => document.getElementById('header_error-message').style.display = 'none', 1e4);
    }

    /**
     * Метод, который проверяет результат валидации данных.
     * @param {{status: boolean, message: String}} valData - объект с полем статуса проверки status
     * и полем сообщением ошибки message
     * @param {object} element - элемент, который валидируем
     * @param {String} additionalClasses - классы, которые необходимо добавить к сообщению об ошибке
     * @return {boolean} - статус валидации
     */
    validateField(valData, element, additionalClasses = null) {
        if (!valData.status) {
            const exError = document.getElementById('error-text');
            if (exError) {
                if (!(exError.innerText === valData.message)) {
                    this.deleteErrorMessage(element.errorID);
                }
            }
            this.getErrorMessage(document.getElementById(element.name),
                element.errorID, valData.message, additionalClasses);
            return false;
        }

        this.deleteErrorMessage(element.errorID);

        return true;
    }
}

export default new ErrorMessage();
