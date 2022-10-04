'use strict'

import '../templates.js'
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import FormComponent from '../../components/Form/Form.js';
import FooterComponent from '../../components/Footer/Footer.js';

export default class RegisterPage extends BasePage {

    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['RegisterPage.hbs']
        );
    }

    render(context) {
        super.render(context)
        this.headerComponent = new HeaderComponent(document.getElementById('header'));
        this.headerComponent.render();
        this.formComponent = new FormComponent(document.getElementById('signup__form'));
        this.formComponent.render(context);
        this.footerComponent = new FooterComponent(document.getElementById('footer'));
        this.footerComponent.render();
    }
}