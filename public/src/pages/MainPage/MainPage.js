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
     * Метод, загружающий карты.
     * @param {string} classToGet имя класса, в который надо вставить карту
     */
    async loadCards(classToGet) {
        //  loading cards
        const r = new Req();
        const [status, outD] = await r.makeGetRequest('api/v1/products')
            .catch((err) => console.log(err));

        if (status === 200) {
            const itemCards = outD.body;
            itemCards.forEach((card, num) => {
                let discount = null;
                card.price === card.lowprice ? card.price = discount :
                    discount = 100 - Math.round(card.lowprice / card.price * 100);
                const newCard = {
                    imgsrc: card.imgsrc,
                    discount: discount,
                    price: card.lowprice,
                    salePrice: card.price,
                    cardTitle: card.name,
                    rating: card.rating,
                };
                this.itemCard = new ItemCard(document.getElementById(`${classToGet}${String(num + 1)}`));
                // this.itemCard = new ItemCard(document.getElementById(`salesCard${String(num + 1)}`));
                this.itemCard.render(newCard);
            });
        } else if (!document.getElementById('ServerLoadError')) {
            console.log('error');
            const div = document.createElement('div');
            div.id = 'ServerLoadError';
            const span = document.createElement('span');
            div.appendChild(span);
            div.classList.add('server-error');
            span.classList.add('server-error__text');
            span.innerHTML = 'Возникла ошибка при загрузке товаров. Попробуйте позже';
            document.getElementById('catalog').after(div);
        }
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
        //  this.headerComponent.stopEventListener(context.authorised);

        await this.loadCards('salesCard');
        await this.loadCards('popularCard');
    }
}
