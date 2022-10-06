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
        let data = [];

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
            const validation = new Val();
            Object.keys(fields).forEach(function (page) {
                data.push(form.querySelector(`[name=${fields[page].name}]`).value);

                if (fields[page].name === "repeat_password") {
                    if (data[data.length - 1] !== data[data.length - 2]) {
                        validation.getErrorMessage(form.getElementById(event.target.name), "repeatPasswordError", "Введенные пароли не совпадают");
                    } else {
                        if (document.getElementById("repeatPasswordError") !== null) {
                            document.getElementById("repeatPasswordError").remove();
                        }
                    }
                }
            });

            //  timing email
            const password = data[2];
            const username = data[1].trim();

            const r = new Req();
            const [status, outD] = await r.makePostRequest('api/v1/signup', {password, username});

            if (status === 201) {
                console.log("auth");
                config.authorised = true;
                config.header.main.render(config);
                return;
            }
            console.log("no auth: ", status);
        });
    }
}
