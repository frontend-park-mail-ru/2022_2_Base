import BasePage from '../BasePage.js';
import CatalogItemCard from '../../components/CatalogItemCard/CatalogItemCard.js';
import './CatalogPage.scss';
import CatalogPageTemplate from './CatalogPage.hbs';
import cartStore from '../../stores/CartStore.js';
import {cartAction, CartActionTypes} from '../../actions/cart.js';
import {config} from '../../config.js';
import {itemCardsAction, ItemCardsActionTypes} from '../../actions/itemCards';
import itemsStore from '../../stores/ItemsStore';
import router from '../../modules/Router';
import errorMessage from '../../modules/ErrorMessage';

/**
 * Класс, реализующий страницу с каталога.
 */
export default class CatalogPage extends BasePage {
    #category;

    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(parent, CatalogPageTemplate);

        this.#category = new Map();
        this.#category.set(config.href.category + '/phones', 'Телефоны');
        this.#category.set(config.href.category + '/monitors', 'Мониторы');
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        cartStore.addListener(this.buttonCreate,
            CartActionTypes.ADD_TO_CART);

        cartStore.addListener(this.buttonAdd,
            CartActionTypes.INCREASE_NUMBER,
        );

        cartStore.addListener(this.buttonMinus,
            CartActionTypes.DECREASE_NUMBER,
        );

        itemsStore.addListener(this.loadCatalogItemCards.bind(this),
            ItemCardsActionTypes.ITEM_CARDS_GET_BY_CATEGORY);

        cartStore.addListener(this.getCart.bind(this), CartActionTypes.GET_CART);
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

    /**
     * Функция, подгружающая и отрисовывающая карточки товаров
     */
    loadCatalogItemCards() {
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            const Card = new CatalogItemCard(document.getElementById('items-block'));
            const data = itemsStore.getContext(itemsStore._storeNames.cardsCategory);
            if (data.length) {
                Card.render(data);
            } else if (
                itemsStore.getContext(itemsStore._storeNames.cardLoadCount) === config.states.endOf) {
                this.removeScrollListener();
            } else {
                router.openNotFoundPage();
            }
            break;
        default:
            router.openNotFoundPage();
            break;
        }
    }

    /**
     * Функция, увеличение количество
     */
    buttonCreate() {
        const addToCartButton = document.getElementById(
            `catalog_button-add-to-cart/${cartStore.getContext(cartStore._storeNames.currID)}`);
        const amountSelector = document.getElementById(
            `catalog_amount-selector/${cartStore.getContext(cartStore._storeNames.currID)}`);
        if (!!addToCartButton && !!amountSelector) {
            amountSelector.style.display = 'grid';
            addToCartButton.style.display = 'none';

            const itemAmount = document.getElementById(
                `catalog_item-count/${cartStore.getContext(cartStore._storeNames.currID)}`);
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
            `catalog_item-count/${cartStore.getContext(cartStore._storeNames.currID)}`);
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
            `catalog_item-count/${cartStore.getContext(cartStore._storeNames.currID)}`);
        if (itemAmount) {
            const count = parseInt(itemAmount.textContent);

            if (count === 1) {
                const amountSelector = document.getElementById(
                    `catalog_amount-selector/${cartStore.getContext(cartStore._storeNames.currID)}`);
                const addToCartButton = document.getElementById(
                    `catalog_button-add-to-cart/${cartStore.getContext(cartStore._storeNames.currID)}`);
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
                case 'catalog_button-add-to-cart':
                    cartAction.addToCart(itemId);
                    break;
                case 'catalog_button-minus_cart':
                    cartAction.decreaseNumber(itemId);
                    break;
                case 'catalog_button-plus_cart':
                    cartAction.increaseNumber(itemId);
                    break;
                case 'catalog_like-button':
                    /* Запрос на добавление товара в избраннное */
                    // console.log(target)
                    // const likeButton = document.getElementById(`catalog_like-button/${itemId}`);
                    // console.log(target.hasAttribute('checked'));
                    // target.setAttribute('checked','');

                    break;
                }
            } else {
                switch (elementId) {
                case 'catalog-item-pic':
                    // target.dataset.href;
                    /* Переход на страницу товара по ссылке в комменте выше */

                    break;
                case 'catalog_item-title':
                    // target.getAttribute('href'));
                    /* Переход на страницу товара по ссылке в комменте выше */
                    break;
                }
            }
        }
    }

    /**
     * Функция, обрабатывающая скролл на странице
     */
    bottomOfPageHandlerPrototype() {
        if ((scrollY + innerHeight > (0.8 * document.body.scrollHeight))) {
            if (!this.waitThrottleScroll) {
                this.waitThrottleScroll = true;
                itemCardsAction.getItemCardsByCategory(false);
                setTimeout(() => {
                    this.waitThrottleScroll = false;
                }, 300);
            }
        }
    }

    /**
     * Метод, добавляющий слушатели
     */
    startEventListener() {
        this.catalogContent = document.getElementById('catalog_content');
        if (this.catalogContent) {
            this.catalogContent.addEventListener('click', this.localEventListenersHandler);
        }


        this.waitThrottleScroll = false;
        this.bottomOfPageHandler = this.bottomOfPageHandlerPrototype.bind(this);
        window.addEventListener('scroll', this.bottomOfPageHandler, {passive: true});
    }

    /**
     * Метод, удаляющий слушатель на скролл.
     */
    removeScrollListener() {
        window.removeEventListener('scroll', this.bottomOfPageHandler);
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        if (this.catalogContent) {
            this.catalogContent.removeEventListener('click', this.localEventListenersHandler);
        }

        this.removeScrollListener();
    }


    /**
     * Метод, отрисовывающий страницу.
     */
    render() {
        this.addListener();
        document.title = this.#category.get(window.location.pathname) + ' ' + document.title;

        super.render({category: this.#category.get(window.location.pathname)});
        cartAction.getCart();
        itemCardsAction.getItemCardsByCategory(true);
        this.startEventListener();
    }
}

