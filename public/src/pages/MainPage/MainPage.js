import mainPageTemplate from './MainPage.hbs';
import BasePage from '../BasePage';
import TopCategory from '../../components/TopCategory/TopCategory';
import ItemCard from '../../components/ItemCard/ItemCard';
import './MainPage.scss';
import itemsStore from '../../stores/ItemsStore';
import {itemCardsAction, ItemCardsActionTypes} from '../../actions/itemCards';
import {config} from '../../config';
import {cartAction, CartActionTypes} from '../../actions/cart';
import cartStore from '../../stores/CartStore';
import errorMessage from '../../modules/ErrorMessage';
import {parseIntInPrice} from '../../modules/sharedFunctions';

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
                const cardElement = document.createElement('div');
                cardElement.id = `${response.classToGet}${String(num)}`;
                cardElement.classList.add('item-card');
                rootElement.before(cardElement);
                const itemCard = new ItemCard(cardElement);
                itemCard.render(card);
            });
        } else if (!document.getElementById('ServerLoadError')) {
            errorMessage.getServerMessage(document.getElementById('catalog'), 'ServerLoadError',
                'Возникла ошибка при загрузке товаров. Попробуйте позже', true);
        }
    }

    /**
     * Функция, обрабатывающая клики на данной странице
     * @param {Event} event контекст события для обработки
     */
    localEventListenersHandler(event) {
        event.preventDefault();
        if (event.target.getAttribute('data-selection')) {
            const [elementId, itemId] = event.target.getAttribute('data-selection').split('/');
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
            }
        }
    }

    /**
     * Функция, увеличение количество
     */
    buttonCreate() {
        const countSelector = document.querySelectorAll(
            '[data-selection=\'itemcard_amount-selector\/' +
            cartStore.getContext(cartStore._storeNames.currID) + '\']');
        const addToCartButton = document.querySelectorAll(
            '[data-selection=\'itemcard_button-add-to-cart\/' +
            cartStore.getContext(cartStore._storeNames.currID) + '\']');
        if (!!addToCartButton && !!countSelector) {
            countSelector.forEach((selector) => selector.style.display = 'grid');
            addToCartButton.forEach((button) => button.style.display = 'none');

            const itemCount = document.querySelectorAll(
                '[data-selection=\'itemcard_item-count\/' +
                cartStore.getContext(cartStore._storeNames.currID) + '\']');
            if (itemCount) {
                itemCount.forEach((item) => item.textContent = '1');
            }
        } else {
            console.warn('Элементы не найдены');
        }
    }

    /**
     * Функция для увеличения количества товара в корзине
     */
    buttonAdd() {
        const itemCount = document.querySelectorAll(
            '[data-selection=\'itemcard_item-count\/' +
            cartStore.getContext(cartStore._storeNames.currID) + '\']');
        if (itemCount.length) {
            const count = parseIntInPrice(itemCount[0].textContent);
            itemCount.forEach((item) => item.textContent = (count + 1).toString());
        }
    }

    /**
     * Функция для уменьшения количества товара в корзине
     */
    buttonMinus() {
        const itemCount = document.querySelectorAll(
            '[data-selection=\'itemcard_item-count\/' +
            cartStore.getContext(cartStore._storeNames.currID) + '\']');
        if (itemCount.length) {
            const count = parseIntInPrice(itemCount[0].textContent);

            if (count === 1) {
                const countSelector = document.querySelectorAll(
                    '[data-selection=\'itemcard_amount-selector\/' +
                    cartStore.getContext(cartStore._storeNames.currID) + '\']');
                const addToCartButton = document.querySelectorAll(
                    '[data-selection=\'itemcard_button-add-to-cart\/' +
                    cartStore.getContext(cartStore._storeNames.currID) + '\']');
                if (!!addToCartButton && !!countSelector) {
                    countSelector.forEach((selector) => selector.style.display = 'none');
                    addToCartButton.forEach((button) => button.style.display = 'flex');
                } else {
                    console.warn(
                        'Элементы не найдены: addToCartButton, addToCartButton');
                }
            } else {
                itemCount.forEach((item) => item.textContent = (count - 1).toString());
            }
        }
    }

    /**
     * Функция, реагирующая на получение товаров из корзины
     */
    getCart() {
        switch (cartStore.getContext(cartStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
        case config.responseCodes.code401:
            itemCardsAction.getHomeItemCards(config.api.products, true);
            itemCardsAction.getHomeItemCards(config.api.products, false);
            break;
        default:
            itemCardsAction.getHomeItemCards(config.api.products, true);
            itemCardsAction.getHomeItemCards(config.api.products, false);
            // errorMessage.getAbsoluteErrorMessage('Ошибка при загрузке данных корзины');
            break;
        }
    }

    /**
     * Функция, запускающая таймер скидки
     */
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
        super.render(config);

        this.topComponent = new TopCategory(document.getElementById('catalog'));
        this.topComponent.render(itemsStore.getContext(itemsStore._storeNames.topCategory));

        cartAction.getCart();
        this.startEventListener();
        this.startTimer();
    }
}
