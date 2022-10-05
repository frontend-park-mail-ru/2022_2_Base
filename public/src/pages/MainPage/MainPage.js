'use strict'

import '../templates.js'
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import TopCategory from '../../components/TopCategory/TopCategory.js';
import FooterComponent from '../../components/Footer/Footer.js';
import ItemCard from '../../components/ItemCard/ItemCard.js';
import Req from "../../modules/ajax";

export default class MainPage extends BasePage {

    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['MainPage.hbs']
        );
    }

    async render(context) {

        // const r = new Req();
        // const [status, photoPath] = await r.makeGetRequest('api/v1/');
        // console.log(status);
        //
        // if (status === 200) {
        //     console.log("session");
        //
        //     return;
        // }
        // console.log("no photo");


        let key;
        super.render(context)
        this.headerComponent = new HeaderComponent(document.getElementById('header'));
        this.headerComponent.render(context.authorised);
        this.topComponent = new TopCategory(document.getElementById('catalog'));
        this.topComponent.render(context.topcategory);
        for (key in context.itemCardsSales) {
            this.itemCard = new ItemCard(document.getElementById(key));
            this.itemCard.render(context.itemCardsSales[key]);
        }
        for (key in context.itemCardsPopular) {
            this.itemCard = new ItemCard(document.getElementById(key));
            this.itemCard.render(context.itemCardsPopular[key]);
        }
        this.footerComponent = new FooterComponent(document.getElementById('footer'));
        this.footerComponent.render();
    }
}