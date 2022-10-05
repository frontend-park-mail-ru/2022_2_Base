'use strict'

import '../templates.js'
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import FormComponent from '../../components/Form/Form.js';
import FooterComponent from '../../components/Footer/Footer.js';
import Req from "../../modules/ajax.js";

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

        let data = [];
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            Object.keys(fields).forEach(function (page) {
                event.preventDefault();
                console.log(form.getAttribute(fields[page].name));
                data.push(form.querySelector(`[name=${fields[page].name}]`).value);
                // console.log(context[page]);
            });
            // timing email
            data[0] = data[0].trim();
            const password = data[1];
            const username = data[0];

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


            // ajax.post({
            //     url: '/api/v1/login',
            //     body: {password, username},
            //     callback: (status => {
            //         if (status === 204) {
            //             console.log("auth");
            //             config.header.main.render(config);
            //             return;
            //         }
            //         console.log("no auth");
            //     })
            // });
        });
    }
}