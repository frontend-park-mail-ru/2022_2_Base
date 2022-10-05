'use strict'

import '../templates.js'
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import FormComponent from '../../components/Form/Form.js';
import FooterComponent from '../../components/Footer/Footer.js';

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
        this.headerComponent.render();
        this.formComponent = new FormComponent(document.getElementById('signup__form'));
        this.formComponent.render(context);
        this.footerComponent = new FooterComponent(document.getElementById('footer'));
        this.footerComponent.render();

        const form = document.getElementById('signup__form');
        const fields = context.fields;

        let data = [];
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            Object.keys(fields).forEach(function (page) {
                event.preventDefault();
                //console.log(form.querySelector(`[name=${fields[page].name}]`).value);
                data.push(form.querySelector(`[name=${fields[page].name}]`).value);

                getErrorMessage(form.querySelector(`[name=${fields[page].name}]`));
                //target.style.transform='scaleX(2)';

                // console.log(context[page]);
            });

            //  timing email
            data[0] = data[0].trim();
            ajax.post({
                url: '/login',
                body: data,
                callback: (status => {
                    if (status === 204) {
                        console.log("auth");
                        config.header.main.render(config);
                        return;
                    }
                    console.log("no auth");
                })
            });
        });

    }
}
