export default class Validation {
    #valEmail
    #valPassword
    #valPasswordsEqual

    constructor() {
        this.#valEmail =
            this.#valPassword =
                this.#valPasswordsEqual =
                    null;
    }

    getErrorMessage = (target, nameId, message) => {
        const div = document.createElement("div");
        div.id = nameId;
        const span = document.createElement("span");
        div.appendChild(span);
        div.classList.add('input-field-error');
        span.classList.add('input-field-error__text');
        span.innerHTML = message;
        target.after(div);
    };

    getServerMessage = (target, nameId, message) => {
        const div = document.createElement("div");
        div.id = nameId;
        const span = document.createElement("span");
        div.appendChild(span);
        div.classList.add('server-error');
        span.classList.add('server-error__text');
        span.innerHTML = message;
        target.before(div);
    };

    validateEMail = (data) => {
        const email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
        if (!(email).test(data)) {
            return {status: false, message: 'Неверный формат почты'};
        }
        return {status: true, message: ''};
    };

    validatePassword = (data) => {
        if (data.length < 6) {
            return {status: false, message: 'Должен содержать минимум 6 символов'};
        }
        return {status: true, message: ''};
    };

    validateFields = (username, password) => {
        this.#valEmail = this.validateEMail(username)
        this.#valPassword = this.validatePassword(password)
    }

    getFields = () => {
        return this.#valEmail && this.#valPassword
    }

    validateRegFields = (username, password, anotherPassword) => {
        this.#valEmail = this.validateEMail(username)
        this.#valPassword = this.validatePassword(password)
        this.#valPasswordsEqual.status = password === anotherPassword;
    }

    getRegFields = () => {
        return this.#valEmail.status && this.#valPassword.status && this.#valPasswordsEqual.status
    }
};
