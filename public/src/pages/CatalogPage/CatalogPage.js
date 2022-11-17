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

        cartStore.addListener(this.defaultButton.bind(this, this.buttonCreate),
            CartActionTypes.ADD_TO_CART);

        cartStore.addListener(this.defaultButton.bind(this, this.buttonAdd),
            CartActionTypes.INCREASE_NUMBER,
        );

        cartStore.addListener(this.defaultButton.bind(this, this.buttonMinus),
            CartActionTypes.DECREASE_NUMBER,
        );

        itemsStore.addListener(this.loadCatalogItemCards,
            ItemCardsActionTypes.ITEM_CARDS_GET_BY_CATEGORY);
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
            } else {
                console.log(document.location.pathname);
                window.history.replaceState(
                    {page: document.location.pathname + (window.history.length).toString()},
                    '', document.location.pathname);
                router.openPage(config.href.notFound);
            }
            break;
        default:
            errorMessage.getAbsoluteErrorMessage();
            break;
        }
    }

    /**
     * Оберточная функция для кнопок в корзину
     * @param {function} toDo - функция для выполнения на коде 200
     */
    defaultButton(toDo) {
        switch (cartStore.getContext(cartStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            toDo();
            break;
        default:
            toDo();
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
                `catalog_item-amount/${cartStore.getContext(cartStore._storeNames.currID)}`);
            if (itemAmount) {
                if (parseInt(itemAmount.textContent) === 0) {
                    // Можно получать количество элементов из HTML, а можно по запросу,
                    // так данные будут более актуальны
                    itemAmount.textContent = '1';
                }
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
            `catalog_item-amount/${cartStore.getContext(cartStore._storeNames.currID)}`);
        if (itemAmount) {
            const amount = parseInt(itemAmount.textContent);
            // Можно получать количество элементов из HTML, а можно по запросу,
            // так данные будут более актуальны
            itemAmount.textContent = (amount + 1).toString();
        }
    }

    /**
     * Функция для уменьшения количества товара в корзине
     */
    buttonMinus() {
        const itemAmount = document.getElementById(
            `catalog_item-amount/${cartStore.getContext(cartStore._storeNames.currID)}`);
        if (itemAmount) {
            const amount = parseInt(itemAmount.textContent);
            // Можно получать количество элементов из HTML, а можно по запросу,
            // так данные будут более актуальны

            if (amount === 1) {
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
                itemAmount.textContent = (amount - 1).toString();
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
                    /* запрос на добавление товара в корзину */
                    cartAction.addToCart(itemId);
                    break;
                case 'catalog_button-minus_cart':
                    /* Запрос на уменьшение количества единиц товара в корзине */
                    cartAction.decreaseNumber(itemId);
                    break;
                case 'catalog_button-plus_cart':
                    /* Запрос на увеличение количества единиц товара в корзине */
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
     * @param {Event} event контекст события для обработки
     */
    bottomOfPageHandlerPrototype(event) {
        if ((scrollY + innerHeight > (0.95 * document.body.scrollHeight))) {
            this.loadCatalogItemCards();
        }
    }


    /**
     * Метод, обрабатывающий скролл, в котором есть this класса
     */
    bottomOfPageHandler = this.bottomOfPageHandlerPrototype.bind(this);

    /**
     * Метод, добавляющий слушатели
     */
    startEventListener() {
        const catalogContent = document.getElementById('catalog_content');
        if (catalogContent) {
            catalogContent.addEventListener('click', this.localEventListenersHandler);
        }

        window.addEventListener('scroll', this.bottomOfPageHandler);
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const catalogContent = document.getElementById('catalog_content');
        if (catalogContent) {
            catalogContent.removeEventListener('click', this.localEventListenersHandler);
        }

        // remove scroll!
    }


    /**
     * Метод, отрисовывающий страницу.
     */
    render() {
        document.title = this.#category.get(window.location.pathname) + ' ' + document.title;

        super.render({category: this.#category.get(window.location.pathname)});
        itemCardsAction.getItemCardsByCategory();
        this.startEventListener();
    }
}

