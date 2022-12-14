import {config} from '../config';

/**
 * Класс, реализующий отрисовку ошибок.
 */
class ErrorMessage {
    errorElement: HTMLElement | null;
    timeoutFunc: emptyCallback | null;
    /**
     * Конструктор класса для вывода сообщений об ошибках.
     */
    constructor() {
        this.errorElement = null;
        this.timeoutFunc = null;
    }
    /**
     * Метод, который отрисовывает сообщение об ошибке ввода
     * @param target - HTML-элемент, после которого будет осуществлена отрисовка
     * @param nameId - id HTML-элемента, который будет отрисован
     * @param message - сообщение для отрисовки
     * @param additionalClasses - классы, которые необходимо добавить к сообщению об ошибке
     */
    getErrorMessage(target: HTMLElement | null, nameId: string, message: string,
        additionalClasses: string | null = null) {
        const errorMsg = document.getElementById(nameId + 'Error');
        if (!errorMsg) {
            const div = document.createElement('div');
            div.id = nameId;
            const span = document.createElement('span');
            div.appendChild(span);
            if (additionalClasses) {
                div.classList.add(additionalClasses);
            }
            div.classList.add('input-field-error');
            span.classList.add('input-field-error__text');
            span.id = 'error-text';
            span.textContent = message;
            target?.after(div);
        }
    }

    /**
     * Метод, удаляющий сообщение об ошибке при фокусе на поле ввода
     * @param nameId - название поля
     */
    deleteErrorMessage(nameId: string) {
        const errorMessageElement = document.getElementById(nameId);
        if (errorMessageElement) {
            errorMessageElement.remove();
        }
    }

    /**
     * Метод, который отрисовывает сообщение об ошибке сервера.
     * @param target - HTML-элемент, после (до) которого будет осуществлена отрисовка
     * @param nameId - id HTML-элемента, который будет отрисован
     * @param message - сообщение для отрисовки
     * @param after - вставить после или до target
     */
    getServerMessage(target: HTMLElement, nameId: string, message: string, after = false) {
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
     * Метод, показывающий уведомляющее сообщение
     * @param errorText - текст ошибки
     */
    getAbsoluteNotificationMessage(errorText= 'Возникла ошибка. Попробуйте позже') {
        this.getAbsoluteMessage(errorText, 'server-message');
    }

    /**
     * Метод, показывающий ошибку
     * @param errorText - текст ошибки
     */
    getAbsoluteErrorMessage(errorText= 'Возникла ошибка. Попробуйте позже') {
        this.getAbsoluteMessage(errorText);
    }

    /**
     * Метод, показывающий сообщение
     * @param errorText - текст ошибки
     * @param serverMessageClass - класс для покраски сообщения
     */
    getAbsoluteMessage(errorText= 'Возникла ошибка. Попробуйте позже', serverMessageClass = '') {
        this.errorElement = document.getElementById('header_error-message');
        if (!this.errorElement) {
            config.HTMLskeleton.main.insertAdjacentHTML(
                'afterbegin',
                `<div class="server-error header__error-message ${serverMessageClass}" 
                            style="display: flex;"
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
            const errorElementText = document.getElementById('server-error__text_');
            if (errorElementText) {
                errorElementText.textContent = errorText;
            }
            this.errorElement.style.display = 'flex';
            this.timeoutFunc = () => (this.errorElement ?
                this.errorElement.style.display = 'none' :
                console.log('element errorElement not found'));
        }
        setTimeout(this.timeoutFunc, 5000);
    }

    /**
     * Метод, который проверяет результат валидации данных.
     * @param valData - объект с полем статуса проверки status
     * и полем сообщением ошибки message
     * @param element - элемент, который валидируем
     * @param additionalClasses - классы, которые необходимо добавить к сообщению об ошибке
     * @returns - статус валидации
     */
    validateField(valData: {status: boolean, message: string},
        element: {errorID: string, name:string}, additionalClasses: string | null = null) {
        if (!valData.status) {
            const exError = document.getElementById('error-text');
            if (exError) {
                this.deleteErrorMessage(element.errorID);
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
