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
            span.textContent = message;
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
     * @param {object} target - HTML-элемент, после (до) которого будет осуществлена отрисовка
     * @param {string} nameId - id HTML-элемента, который будет отрисован
     * @param {string} message - сообщение для отрисовки
     * @param {boolean} after - вставить после или до target
     */
    getServerMessage(target, nameId, message, after = false) {
        const div = document.createElement('div');
        div.id = nameId;
        const span = document.createElement('span');
        div.appendChild(span);
        div.classList.add('server-error');
        span.classList.add('server-error__text');
        span.textContent = message;
        after ? target.after(div) : target.before(div);
    }

    /**
     * Метод, показывающий ошибку
     * @param {string} errorText - текст ошибки
     */
    getAbsoluteErrorMessage(errorText= 'Возникла ошибка. Попробуйте позже') {
        this.errorElement = document.getElementById('header_error-message');
        if (!this.errorElement) {
            document.getElementById('main').insertAdjacentHTML(
                'afterbegin',
                `<div class="server-error header_error-message" style="display: flex;"
                        id="header_error-message">
                    <span class="server-error__text" id="server-error__text_">
                        ${errorText}
                    </span>
                        </div>`);
            this.timeoutFunc = () => {
                const errElement = document.getElementById('header_error-message');
                if (errElement) {
                    errElement.style.display = 'none';
                }
            };
        } else {
            document.getElementById('server-error__text_').textContent = errorText;
            this.errorElement.style.display = 'flex';
            this.timeoutFunc = () => this.errorElement.style.display = 'none';
        }
        setTimeout(this.timeoutFunc, 5000);
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
