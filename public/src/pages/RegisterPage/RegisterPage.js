'use strict'

import '../templates.js'
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import FormComponent from '../../components/Form/Form.js';
import FooterComponent from '../../components/Footer/Footer.js';
import Req from "../../modules/ajax.js";

const getErrorMessage = (target) => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    div.appendChild(span);
    div.classList.add('input-field-error');
    span.classList.add('input-field-error__text');
    span.innerHTML = "Wrong password";
    target.after(div);
}

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

        form.addEventListener('submit', async(event) => {
            event.preventDefault();
            Object.keys(fields).forEach(function (page) {
                event.preventDefault();
                data.push(form.querySelector(`[name=${fields[page].name}]`).value);
            });
            //  timing email
            data[0] = data[0].trim();
            const password = data[2];
            const username = data[1];
            console.log(password);
            console.log(username);

            const r = new Req();
            const [status, outD] = await r.makePostRequest('api/v1/signup', {password, username});
            console.log(status);

            if (status === 201) {
                console.log("auth");
                config.authorised = true;
                config.header.main.render(config);
                return;
            }
            console.log("no auth");
        });
    }
}
