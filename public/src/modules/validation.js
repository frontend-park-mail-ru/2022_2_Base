export default class Validation {
    #valEmail
    #valPassword
    #valPasswordsEqual

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
        const email = /@/;
        if (!(email).test(data)) {
            return {status: false, message: 'Неверный формат почты'};
        }
        return {status: true, message: ''};
    };

    validatePassword = (data) => {
        if (data.length < 6) {
            return {status: false, message: 'Должен содержать минимум 6 символов'};
        }
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
        if (password === anotherPassword) {
            this.#valPasswordsEqual = true
        } else {
            this.#valPasswordsEqual = false
        }
    }

    getRegFields = () => {
        console.log('em', this.#valEmail.status)
        console.log('ps', this.#valPassword.status)
        console.log('ps2', this.#valPasswordsEqual)


        return this.#valEmail.status && this.#valPassword.status && this.#valPasswordsEqual
    }
};
