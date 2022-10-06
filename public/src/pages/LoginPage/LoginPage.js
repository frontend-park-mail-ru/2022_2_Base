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

        form.addEventListener("focusout", (event, isDataValid) => {
            const validation = new Val();
            const submitButton = document.getElementById('submit-result');
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
            let data = [];
            event.preventDefault();
            Object.keys(fields).forEach(function (page) {
                data.push(form.querySelector(`[name=${fields[page].name}]`).value);
            });

            // console.log(data);
            // const validation = new Val();
            // const st1 = validation.validateEMail(data[0]) === undefined ? true : validation.validateEMail(data[0]).status;
            // const st2 = validation.validatePassword(data[1]) === undefined ? true : validation.validateEMail(data[0]).status;
            // console.log(st1 && st2);

            // timing email
            data[0] = data[0].trim();
            const [username, password] = data;

            const r = new Req();
            const [status, outD] = await r.makePostRequest('api/v1/login', {password, username});

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
