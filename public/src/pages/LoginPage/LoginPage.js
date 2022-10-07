'use strict';

import '../templates.js';
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import FormComponent from '../../components/Form/Form.js';
import FooterComponent from '../../components/Footer/Footer.js';
import Req from '../../modules/ajax.js';
import Val from '../../modules/validation.js';

export default class LoginPage extends BasePage {
    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['LoginPage.hbs'],
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
        document.getElementById(fields.email.name).focus();

        const realTimeCheckHandler = async (event) => {
            const validation = new Val();
            switch (event.target.name) {
            case 'email':
                const valEmail = validation.validateEMail(event.target.value);
                if (valEmail !== undefined && !valEmail.status) {
                    validation.getErrorMessage(document.getElementById(event.target.name),
                        'emailError', valEmail.message);
                } else if (document.getElementById('emailError') !== null) {
                    document.getElementById('emailError').remove();
                }
                break;
            case 'password':
                const valPassword = validation.validatePassword(event.target.value);
                if (valPassword !== undefined && !valPassword.status) {
                    validation.getErrorMessage(document.getElementById(event.target.name),
                        'passwordError', valPassword.message);
                } else if (document.getElementById('passwordError') !== null) {
                    document.getElementById('passwordError').remove();
                }
                break;
            }
        };

        const onSubmitHandler = async (event) => {
            const data = [];
            const validation = new Val();
            event.preventDefault();
            Object.keys(fields).forEach((page) => {
                const element = form.querySelector(`[name=${fields[page].name}]`);
                data.push(element.value);
            });

            // timing email
            data[0] = data[0].trim();
            const [email, password] = data;

            console.log('credentials valid', validation.validateRegFields(email, password));
            if (validation.validateRegFields(email, password)) {
                const r = new Req();
                const [status] = await r.makePostRequest('api/v1/login', {password, email}).
                    catch((err) => console.log(err));

                switch (status) {
                case 201:
                    console.log('auth');
                    config.authorised = true;
                    form.removeEventListener('focusout', realTimeCheckHandler);
                    form.removeEventListener('submit', onSubmitHandler);
                    config.header.main.render(config);
                    break;
                case 400:
                    document.getElementById('Error400Message') === null ?
                        validation.getServerMessage(document.getElementById('inForm'),
                            'Error400Message', 'Ошибка. Попробуйте еще раз') :
                        console.log('bad request: ', status);
                    break;
                case 401:
                    validation.getErrorMessage(document.getElementById(fields.email.name),
                        'emailError', 'Неверная почта или пароль');
                    console.log('no auth: ', status);
                    break;
                default:
                    document.getElementById('serverErrorMessage') === null ?
                        validation.getServerMessage(document.getElementById('inForm'),
                            'serverErrorMessage', 'Ошибка сервера. Попробуйте позже') :
                        console.log('server error: ', status);
                    break;
                }
            }
        };

        form.addEventListener('focusout', realTimeCheckHandler);

        form.addEventListener('submit', onSubmitHandler);
    }
}
