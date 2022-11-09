import mainPageTemplate from './MainPage.hbs';
import BasePage from '../BasePage.js';
import TopCategory from '../../components/TopCategory/TopCategory.js';
import ItemCard from '../../components/ItemCard/ItemCard.js';
import './MainPage.scss';
import itemsStore from '../../stores/ItemsStore.js';
import {itemCardsAction, ItemCardsActionTypes} from '../../actions/itemCards.js';

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
        const response = itemsStore.getContext(itemsStore._storeNames.cardsHome);
        if (itemsStore.getContext(itemsStore._storeNames.responseCode) === 200) {
            const rootElement = document.getElementById(response.classToGet + '__right-arrow');
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
                    id: card.id,
                };
                /* creating div to add */
                const cardElement = document.createElement('div');
                cardElement.id = `${response.classToGet}${String(num)}`;
                cardElement.classList.add('item-card');
                rootElement.before(cardElement);
                /* rendering card itself */
                const itemCard = new ItemCard(cardElement);
                itemCard.render(newCard);
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
     * Функция, обрабатывающая клики на данной странице
     * @param {Event} event контекст события для обработки
     */
    localEventListenersHandler(event) {
        event.preventDefault();
        const target = event.target;
        let elementId = target.id;
        let itemId;
        if (elementId) {
            if (elementId.includes('/')) {
                [elementId, itemId] = elementId.split('/');
                switch (elementId) {
                case 'itemcard_button-add-to-cart':
                    /* запрос на добавление товара в корзину */
                    if (true) { // FIX!!! если запрос успешный
                        const addToCartButton = document.getElementById(
                            `itemcard_button-add-to-cart/${itemId}`);
                        const amountSelector = document.getElementById(
                            `itemcard_amount-selector/${itemId}`);
                        if (!!addToCartButton && !!amountSelector) {
                            amountSelector.style.display = 'grid';
                            addToCartButton.style.display = 'none';

                            const itemAmount = document.getElementById(`itemcard_item-amount/${itemId}`);
                            if (itemAmount) {
                                if (parseInt(itemAmount.textContent) === 0) {
                                    // Можно получать количество элементов из HTML, а можно по запросу,
                                    // так данные будут более актуальны
                                    itemAmount.textContent = '1';
                                }
                            }
                        } else {
                            console.warn('Элементы не найдены: addToCartButton, addToCartButton');
                        }
                    }
                    break;
                case 'itemcard_button-minus_cart':
                    /* Запрос на уменьшение количества единиц товара в корзине */
                    if (true) { // FIX!!! если запрос успешный
                        const itemAmount = document.getElementById(`itemcard_item-amount/${itemId}`);
                        if (itemAmount) {
                            const amount = parseInt(itemAmount.textContent);
                            // Можно получать количество элементов из HTML, а можно по запросу,
                            // так данные будут более актуальны

                            if (amount === 1) {
                                const amountSelector = document.getElementById(
                                    `itemcard_amount-selector/${itemId}`);
                                const addToCartButton = document.getElementById(
                                    `itemcard_button-add-to-cart/${itemId}`);
                                if (!!addToCartButton && !!amountSelector) {
                                    amountSelector.style.display = 'none';
                                    addToCartButton.style.display = 'flex';
                                    itemAmount.textContent = '0';
                                } else {
                                    console.warn(
                                        'Элементы не найдены: addToCartButton, addToCartButton');
                                }
                            } else {
                                itemAmount.textContent = (amount - 1).toString();
                            }
                        }
                    }

                    break;
                case 'itemcard_button-plus_cart':
                    /* Запрос на увеличение количества единиц товара в корзине */
                    if (true) { // FIX!!! если запрос успешный
                        const itemAmount = document.getElementById(`itemcard_item-amount/${itemId}`);
                        if (itemAmount) {
                            const amount = parseInt(itemAmount.textContent);
                            // Можно получать количество элементов из HTML, а можно по запросу,
                            // так данные будут более актуальны
                            itemAmount.textContent = (amount + 1).toString();
                        }
                    }
                    break;
                case 'itemcard_item-title':
                    // 'item/'+itemId
                    /* Переход на страницу товара по ссылке в комменте выше */
                    break;
                case 'itemcard_item-pic':
                    // 'item/' + itemId
                    /* Переход на страницу товара по ссылке в комменте выше */

                    break;
                }
            } else {
                switch (elementId) {
                case 'mainpage_top-category':
                    // 'item/'+ target.dataset.href
                    /* Переход на страницу категории по ссылке в комменте выше */

                    break;
                }
            }
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        const catalogContent = document.getElementById('content_main');
        if (catalogContent) {
            catalogContent.addEventListener('click', this.localEventListenersHandler);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const catalogContent = document.getElementById('catalog_content');
        if (catalogContent) {
            catalogContent.removeEventListener('click', this.localEventListenersHandler);
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
        this.startEventListener();
    }
}
