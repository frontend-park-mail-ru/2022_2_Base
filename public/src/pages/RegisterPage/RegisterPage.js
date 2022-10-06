'use strict'

import '../templates.js'
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import FormComponent from '../../components/Form/Form.js';
import FooterComponent from '../../components/Footer/Footer.js';
import Req from "../../modules/ajax.js";
import Val from "../../modules/validation.js";

export default class RegisterPage extends BasePage {

    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['RegisterPage.hbs']
        );
    }

    render(config) {
        const context = config.forms.signup;
        super.render(context);
        this.headerComponent = new HeaderComponent(document.getElementById('header'));
        this.headerComponent.render(config.authorised);
        this.formComponent = new FormComponent(document.getElementById('signup__form'));
        this.formComponent.render(context);
        this.footerComponent = new FooterComponent(document.getElementById('footer'));
        this.footerComponent.render();

        const form = document.getElementById('signup__form');
        const fields = context.fields;
        document.getElementById(fields.name.name).focus();

        form.addEventListener("focusout", async (event) => {
            const validation = new Val();

            switch (event.target.name) {
                case "email":
                    const valEmail = validation.validateEMail(event.target.value);
                    if (valEmail !== undefined && valEmail.message !== '') {
                        validation.getErrorMessage(document.getElementById(event.target.name), "emailError", valEmail.message);
                    } else if (document.getElementById("emailError") !== null) {
                        document.getElementById("emailError").remove();
                    }
                    break;
                case "password":
                    const valPassword = validation.validatePassword(event.target.value);
                    if (valPassword !== undefined && valPassword.message !== '') {
                        validation.getErrorMessage(document.getElementById(event.target.name), "passwordError", valPassword.message);
                    } else if (document.getElementById("passwordError") !== null) {
                        document.getElementById("passwordError").remove();
                    }
                    break;
            }
        });

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            let data = [];
            const validation = new Val();
            Object.keys(fields).forEach(function (page) {
                const element = form.querySelector(`[name=${fields[page].name}]`)
                element.focus();
                element.blur();
                data.push(element.value);
            });
            if (data[data.length - 1] !== data[data.length - 2]) {
                validation.getErrorMessage(document.getElementById(fields.repeatPassword.name), "repeatPasswordError", "Введенные пароли не совпадают");
            } else {
                if (document.getElementById("repeatPasswordError") !== null) {
                    document.getElementById("repeatPasswordError").remove();
                }
            }

            //  timing email
            data[1] = data[1].trim();
            const [username, email, password, anotherPassword] = data;

            console.log("credentials valid", validation.validateRegFields(email, password, anotherPassword))
            if (validation.validateRegFields(email, password, anotherPassword)) {

                const r = new Req();
                const [status, outD] = await r.makePostRequest('api/v1/signup', {password, email, username});

                switch (status) {
                    case 201:
                        console.log("auth");
                        config.authorised = true;
                        config.header.main.render(config);
                        break;
                    case 400:
                        document.getElementById("Error400Message") === null ?
                            validation.getServerMessage(document.getElementById('inForm'), "Error400Message", "Ошибка. Попробуйте еще раз")
                            : console.log("bad request: ", status);
                        break;
                    case 409:
                        validation.getErrorMessage(document.getElementById(fields.email.name), "emailError", "Почта уже занята");
                        console.log("no auth: ", status);
                        break;
                    default:
                        document.getElementById("serverErrorMessage") === null ?
                            validation.getServerMessage(document.getElementById('inForm'), "serverErrorMessage", "Ошибка сервера. Попробуйте позже")
                            : console.log("server error: ", status);
                        break;
                }
            }
        });
    }
}
