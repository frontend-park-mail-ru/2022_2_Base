'use strict'

import '../templates.js'
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import TopCategory from '../../components/TopCategory/TopCategory.js';
import FooterComponent from '../../components/Footer/Footer.js';
import ItemCard from '../../components/ItemCard/ItemCard.js';
import Req from "../../modules/ajax.js";

export default class MainPage extends BasePage {

    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['MainPage.hbs']
        );
    }

    async render(context) {

        super.render(context)
        this.headerComponent = new HeaderComponent(document.getElementById('header'));
        this.headerComponent.render(context.authorised);
        this.topComponent = new TopCategory(document.getElementById('catalog'));
        this.topComponent.render(context.topcategory);
        this.footerComponent = new FooterComponent(document.getElementById('footer'));
        this.footerComponent.render();

        const r = new Req();
        const [status, outD] = await r.makeGetRequest('api/v1/').catch((err) => console.log(err));

        if(status === 200){
            let key;
            let card;
            let num = 1;
            let itemCards = outD.body
            for (key in itemCards){
                card = itemCards[key]
                let discount = 100 - Math.round(card.DiscountPrice/card.Price*100);
                let newCard = {     
                            imgsrc: card.Imgsrc,
                            discount: discount,
                            price: card.DiscountPrice,
                            salePrice: card.Price,
                            cardTitle: card.Name,
                            rating: card.Rating,
                        };
                if (discount == 0){newCard.salePrice = null}
                let cardID = "salesCard" + String(num)
                console.log(newCard.imgsrc)
                this.itemCard = new ItemCard(document.getElementById(cardID));
                this.itemCard.render(newCard);
                num ++;
            }
            num = 1;

            for (key in itemCards){
                card = itemCards[key]
                let discount = 100 - Math.round(card.DiscountPrice/card.Price*100);
                let newCard = {     
                            imgsrc: card.Imgsrc,
                            discount: discount,
                            price: card.DiscountPrice,
                            salePrice: card.Price,
                            cardTitle: card.Name,
                            rating: card.Rating,
                        };
                let cardID = "popularCard" + String(num)
                this.itemCard = new ItemCard(document.getElementById(cardID));
                this.itemCard.render(newCard);
                num ++;
            }
        } 
    }
}