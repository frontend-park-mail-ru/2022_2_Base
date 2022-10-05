'use strict'

import '../templates.js'
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import FormComponent from '../../components/Form/Form.js';
import FooterComponent from '../../components/Footer/Footer.js';
import Req from "../../modules/ajax.js";
import Val from "../../modules/validation.js";

export default class LoginPage extends BasePage {

    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['LoginPage.hbs']
        );
    }

    render(config) {
        const context = config.forms.signin;
        super.render(context);
        this.headerComponent = new HeaderComponent(document.getElementById('header'));
        this.headerComponent.render(config.authorised);
        this.formComponent = new FormComponent(document.getElementById('login-form'));
        this.formComponent.render(context);
        this.footerComponent = new FooterComponent(document.getElementById('footer'));
        this.footerComponent.render();

        const form = document.getElementById('login-form');
        const fields = context.fields;

        let isDataValid = false;

        form.addEventListener("focusout", async (event) => {
            const validation = new Val();

            switch (event.target.name) {
                case "email":
                    const valEmail = validation.validateEMail(event.target.value);
                    if (valEmail !== undefined && valEmail.message !== '') {
                        isDataValid = false;
                        validation.getErrorMessage(document.getElementById(event.target.name), "emailError", valEmail.message);
                    } else if (document.getElementById("emailError") !== null) {
                        document.getElementById("emailError").remove();
                        isDataValid = true;
                    }
                    break;
                case "password":
                    const valPassword = validation.validatePassword(event.target.value);
                    if (valPassword !== undefined && valPassword.message !== '') {
                        isDataValid = true;
                        validation.getErrorMessage(document.getElementById(event.target.name), "passwordError", valPassword.message);
                    } else if (document.getElementById("passwordError") !== null) {
                        isDataValid = false;
                        document.getElementById("passwordError").remove();
                    }
                    break;
            }
        });

        let data = [];
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            Object.keys(fields).forEach(function (page) {
                event.preventDefault();
                console.log(form.getAttribute(fields[page].name));
                data.push(form.getElementById(name).value);
                // console.log(context[page]);
            });

            if (isDataValid) {
                // timing email
                data[0] = data[0].trim();
                const [password, username] = data;
                console.log(data);

                const r = new Req();
                const [status, outD] = await r.makePostRequest('api/v1/login', {password, username});
                console.log(status);

                if (status === 201) {
                    console.log("auth");
                    config.authorised = true;
                    config.header.main.render(config);
                    return;
                }
                console.log("no auth");
            }
        });
    }
}