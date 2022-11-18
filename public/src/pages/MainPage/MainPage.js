import mainPageTemplate from './MainPage.hbs';
import BasePage from '../BasePage.js';
import TopCategory from '../../components/TopCategory/TopCategory.js';
import ItemCard from '../../components/ItemCard/ItemCard.js';
import './MainPage.scss';
import itemsStore from '../../stores/ItemsStore.js';
import {itemCardsAction, ItemCardsActionTypes} from '../../actions/itemCards.js';
import {config} from '../../config.js';
import {cartAction, CartActionTypes} from '../../actions/cart';
import cartStore from '../../stores/CartStore';
import errorMessage from '../../modules/ErrorMessage';

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
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        itemsStore.addListener(this.loadCards,
            ItemCardsActionTypes.ITEM_CARDS_GET_HOME);

        itemsStore.addListener(this.loadCards,
            ItemCardsActionTypes.ITEM_CARDS_GET_HOME,
        );

        cartStore.addListener(this.buttonCreate,
            CartActionTypes.ADD_TO_CART);

        cartStore.addListener(this.buttonAdd,
            CartActionTypes.INCREASE_NUMBER,
        );

        cartStore.addListener(this.buttonMinus,
            CartActionTypes.DECREASE_NUMBER,
        );

        cartStore.addListener(this.getCart.bind(this),
            CartActionTypes.GET_CART);
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
                    count: card.count,
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
                    cartAction.addToCart(itemId);
                    break;
                case 'itemcard_button-minus_cart':
                    cartAction.decreaseNumber(itemId);
                    break;
                case 'itemcard_button-plus_cart':
                    cartAction.increaseNumber(itemId);
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
     * Функция, увеличение количество
     */
    buttonCreate() {
        const addToCartButton = document.getElementById(
            `itemcard_button-add-to-cart/${cartStore.getContext(cartStore._storeNames.currID)}`);
        const amountSelector = document.getElementById(
            `itemcard_amount-selector/${cartStore.getContext(cartStore._storeNames.currID)}`);
        if (!!addToCartButton && !!amountSelector) {
            amountSelector.style.display = 'grid';
            addToCartButton.style.display = 'none';

            const itemAmount = document.getElementById(
                `itemcard_item-count/${cartStore.getContext(cartStore._storeNames.currID)}`);
            if (itemAmount) {
                itemAmount.textContent = '1';
            }
        } else {
            console.warn('Элементы не найдены');
        }
    }

    /**
     * Функция для увеличения количества товара в корзине
     */
    buttonAdd() {
        const itemAmount = document.getElementById(
            `itemcard_item-count/${cartStore.getContext(cartStore._storeNames.currID)}`);
        if (itemAmount) {
            const count = parseInt(itemAmount.textContent);
            itemAmount.textContent = (count + 1).toString();
        }
    }

    /**
     * Функция для уменьшения количества товара в корзине
     */
    buttonMinus() {
        const itemAmount = document.getElementById(
            `itemcard_item-count/${cartStore.getContext(cartStore._storeNames.currID)}`);
        if (itemAmount) {
            const count = parseInt(itemAmount.textContent);

            if (count === 1) {
                const amountSelector = document.getElementById(
                    `itemcard_amount-selector/${cartStore.getContext(cartStore._storeNames.currID)}`);
                const addToCartButton = document.getElementById(
                    `itemcard_button-add-to-cart/${cartStore.getContext(cartStore._storeNames.currID)}`);
                if (!!addToCartButton && !!amountSelector) {
                    amountSelector.style.display = 'none';
                    addToCartButton.style.display = 'flex';
                } else {
                    console.warn(
                        'Элементы не найдены: addToCartButton, addToCartButton');
                }
            } else {
                itemAmount.textContent = (count - 1).toString();
            }
        }
    }

    /**
     * Функция, реагирующая на получение товаров из корзины
     */
    getCart() {
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            break;
        case config.responseCodes.code401:
            break;
        default:
            errorMessage.getAbsoluteErrorMessage();
            break;
        }
    }

    startTimer() {
        const display = document.getElementById('main-page-sale-timer');
        const start = new Date;
        start.setHours(3, 0, 0); // 3am

        const pad = (num) => {
            return ('0' + parseInt(num)).substr(-2);
        };
        const tick = () => {
            const now = new Date;
            if (now > start) { // too late, go to tomorrow
                start.setDate(start.getDate() + 1);
            }
            const remain = ((start - now) / 1000);
            display.textContent =
                pad((remain / 60 / 60) % 60) + ':' +
                pad((remain / 60) % 60) + ':' +
                pad(remain % 60);
            setTimeout(tick, 1000);
        };
        tick();
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        this.catalogContent = document.getElementById('content_main');
        if (this.catalogContent) {
            this.catalogContent.addEventListener('click', this.localEventListenersHandler);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        if (this.catalogContent) {
            this.catalogContent.removeEventListener('click', this.localEventListenersHandler);
        }
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    render() {
        cartAction.getCart();
        super.render(config);

        this.topComponent = new TopCategory(document.getElementById('catalog'));
        this.topComponent.render(itemsStore.getContext(itemsStore._storeNames.topCategory));

        itemCardsAction.getHomeItemCards(config.api.products, true);
        itemCardsAction.getHomeItemCards(config.api.products, false);
        this.startEventListener();
        this.startTimer();
    }
}
