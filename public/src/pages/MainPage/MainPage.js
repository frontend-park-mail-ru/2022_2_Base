import '../templates.js';
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import TopCategory from '../../components/TopCategory/TopCategory.js';
import FooterComponent from '../../components/Footer/Footer.js';
import ItemCard from '../../components/ItemCard/ItemCard.js';

import Req from '../../modules/ajax.js';

/**
 * Класс, реализующий главную страницу
 */
export default class MainPage extends BasePage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['MainPage.hbs'],
        );
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} context контекст отрисовки страницы
     */
    async render(context) {
        super.render(context);
        this.headerComponent = new HeaderComponent(document.getElementById('header'));
        this.headerComponent.render(context.authorised);
        this.topComponent = new TopCategory(document.getElementById('catalog'));
        this.topComponent.render(context.topcategory);
        this.footerComponent = new FooterComponent(document.getElementById('footer'));
        this.footerComponent.render();

        if (context.authorised) {
            const headerProfile = document.querySelector('.header__profile');
            headerProfile.addEventListener('mouseover', async (event) => {
                const headerPopUp = document.querySelector('.profile__pop-up');
                headerPopUp.style.display = 'block';
            });

            headerProfile.addEventListener('mouseout', async (event) => {
                const headerPopUp = document.querySelector('.profile__pop-up');
                headerPopUp.style.display = 'none';
            });
        }

        //  loading cards
        const r = new Req();
        const [status, outD] = await r.makeGetRequest('api/v1/getproducts').catch((err) => console.log(err));

        if (status === 200) {
            const itemCards = outD.body;
            itemCards.forEach((card, num) => {
                const discount = 100 - Math.round(card.lowprice / card.price * 100);
                const newCard = {
                    imgsrc: card.imgsrc,
                    discount: discount,
                    price: card.lowprice,
                    salePrice: card.price,
                    cardTitle: card.name,
                    rating: card.rating,
                };
                if (discount === 0) {
                    newCard.salePrice = newCard.discount = null;
                }
                this.itemCard = new ItemCard(document.getElementById(`salesCard${String(num + 1)}`));
                this.itemCard.render(newCard);
            });

            itemCards.forEach((card, num) => {
                const newCard = {
                    imgsrc: card.imgsrc,
                    discount: null,
                    price: card.lowprice,
                    salePrice: null,
                    cardTitle: card.name,
                    rating: card.rating,
                };
                this.itemCard = new ItemCard(document.getElementById(`popularCard${String(num + 1)}`));
                this.itemCard.render(newCard);
            });
        }
    }
}
