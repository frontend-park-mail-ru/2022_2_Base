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
        const errorMessageElement = document.getElementById(nameId + 'Error');
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
     * Метод, показывающий ошибку
     * @param errorText - текст ошибки
     * @param isError - является ли данное сообщение ошибкой
     */
    getAbsoluteMessage(errorText= 'Возникла ошибка. Попробуйте позже', isError = true) {
        this.errorElement = document.getElementById('header_error-message');
        let serverMessageClass = '';
        if (!isError) {
            serverMessageClass = 'server-message';
        }
        if (!this.errorElement) {
            config.HTMLskeleton.main.insertAdjacentHTML(
                'afterbegin',
                `<div class="server-error header__error-message ${serverMessageClass}" style="display: flex;"
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
            this.timeoutFunc = () => this.errorElement!.style.display = 'none';
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
            if (exError && !(exError.innerText === valData.message)) {
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
