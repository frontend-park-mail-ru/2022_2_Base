'use strict'

import '../templates.js'
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import FormComponent from '../../components/Form/Form.js';
import FooterComponent from '../../components/Footer/Footer.js';

export default class LoginPage extends BasePage {

    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['LoginPage.hbs']
        );
    }

    render({forms}) {
        const context = forms.signin;
        super.render(context);
        this.headerComponent = new HeaderComponent(document.getElementById('header'));
        this.headerComponent.render();
        this.formComponent = new FormComponent(document.getElementById('login-form'));
        this.formComponent.render(context);
        this.footerComponent = new FooterComponent(document.getElementById('footer'));
        this.footerComponent.render();
    }
}