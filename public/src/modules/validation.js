const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class Validation {
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
        if (!(emailRegex).test(data)) {
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

    validateRegFields = (username, password, anotherPassword = password) => {
        return password === anotherPassword && this.validateEMail(username).status &&
            this.validatePassword(password).status
    }
};
