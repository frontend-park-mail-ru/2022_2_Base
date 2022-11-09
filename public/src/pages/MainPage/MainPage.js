import mainPageTemplate from './MainPage.hbs';
import BasePage from '../BasePage.js';
import TopCategory from '../../components/TopCategory/TopCategory.js';
import ItemCard from '../../components/ItemCard/ItemCard.js';
import './MainPage.scss';
import itemsStore from '../../stores/ItemsStore.js';
import {itemCardsAction, ItemCardsActionTypes} from '../../actions/itemCards.js';
import {config} from "../../config";

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
            mainPageTemplate,
        );
        itemsStore.addListener(this.loadCards,
        ItemCardsActionTypes.ITEM_CARDS_GET_HOME);

        itemsStore.addListener(this.loadCards,
            ItemCardsActionTypes.ITEM_CARDS_GET_HOME,
        );
    }

    /**
     * Метод, загружающий карты.
     */
    async loadCards() {
        const response = itemsStore.getContext(itemsStore._storeNames.cardsByPopularity);
        const rootElement = document.getElementById(response.classToGet + '__right-arrow');
        if (itemsStore.getContext(itemsStore._storeNames.responseCode) === 200) {
            console.log(response);
            response.body.forEach((card, num) => {
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
                /* creating div to add */
                const cardElement = document.createElement('div');
                cardElement.id = `${classToGet}${String(num)}`;
                cardElement.classList.add('item-card');
                rootElement.before(cardElement);
                /* rendering card itself */
                this.itemCard = new ItemCard(cardElement);
                this.itemCard.render(newCard);
            });
        } else if (!document.getElementById('ServerLoadError')) {
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
     * @param {object} config контекст отрисовки страницы
     */
    async render(config) {
        super.render(config);

        this.topComponent = new TopCategory(document.getElementById('catalog'));
        this.topComponent.render(itemsStore.getContext(itemsStore._storeNames.topCategory));

        itemCardsAction.getHomeItemCards(config.api.products, true);
        itemCardsAction.getHomeItemCards(config.api.products, false);
    }
}
