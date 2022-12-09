import BasePage from '../BasePage';
import cartStore from '../../stores/CartStore';
import {cartAction, CartActionTypes} from '../../actions/cart';
import {config} from '../../config';
import {itemCardsAction} from '../../actions/itemCards';
import itemsStore from '../../stores/ItemsStore';
import errorMessage from '../../modules/ErrorMessage';
import CatalogPageTemplate from './CatalogPage.hbs';
import './CatalogPage.scss';

/**
 * Класс, реализующий страницу с каталога.
 */
export default class CatalogPage extends BasePage {
    actionToLoadCards: actionFunc;
    addLisitenSortCatalog: addListenerFunction;
    bottomOfPageHandler: addListenerFunction;
    catalogContent: HTMLElement | null;
    catalogSort: HTMLElement | null;
    getSortByPrice: actionFunc;
    getSortByRating: actionFunc;
    itemsBlock: HTMLElement | null;
    priceSortImg: HTMLElement | null;
    ratingSortImg: HTMLElement | null;
    waitThrottleScroll: boolean;
    #category;

    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param parent - HTML-элемент, в который будет осуществлена отрисовка
     * @param childClassData - данные дочернего класса
     */
    constructor(parent: HTMLElement, childClassData: [actionFunc, actionFunc, actionFunc]) {
        super(parent, CatalogPageTemplate);

        [this.actionToLoadCards, this.getSortByRating, this.getSortByPrice] = childClassData;

        this.addLisitenSortCatalog = config.noop;
        this.bottomOfPageHandler = config.noop;

        this.catalogContent = null;
        this.catalogSort = null;
        this.itemsBlock = null;
        this.priceSortImg = null;
        this.ratingSortImg = null;
        this.waitThrottleScroll = false;

        this.#category = new Map();
        this.#category.set(config.href.category + '/phones', 'Телефоны');
        this.#category.set(config.href.category + '/monitors', 'Телефоны');
        this.#category.set(config.href.category + '/computers', 'Компьютеры');
        this.#category.set(config.href.category + '/monitors', 'Мониторы');
        this.#category.set(config.href.category + '/tvs', 'Телевизоры');
        this.#category.set(config.href.category + '/watches', 'Часы');
        this.#category.set(config.href.category + '/tablets', 'Планшеты');
        this.#category.set(config.href.category + '/accessories', 'Аксессуары');
        this.#category.set(config.href.search, 'Поиск');
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    override addListener() {
        cartStore.addListener(this.buttonCreate,
            CartActionTypes.ADD_TO_CART);

        cartStore.addListener(this.buttonAdd,
            CartActionTypes.INCREASE_NUMBER,
        );

        cartStore.addListener(this.buttonMinus,
            CartActionTypes.DECREASE_NUMBER,
        );

        cartStore.addListener(this.getCart.bind(this), CartActionTypes.GET_CART);
    }

    /**
     * Функция, реагирующая на получение товаров из корзины
     */
    getCart() {
        switch (cartStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
        case config.responseCodes.code401:
            this.actionToLoadCards(true);
            break;
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при получении товаров из корзины');
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
            const count = parseInt(itemAmount.textContent ?? '');
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
            const count = parseInt(itemAmount.textContent ?? '');

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
     * @param event - контекст события для обработки
     */
    localEventListenersHandler(event: Event) {
        event.preventDefault();
        const target = event.target;
        if (target instanceof HTMLElement) {
            let elementId = target.id;
            let itemId;
            if (elementId) {
                if (elementId.includes('/')) {
                    [elementId, itemId] = elementId.split('/');
                    switch (elementId) {
                    case 'catalog_button-add-to-cart':
                        cartAction.addToCart(Number(itemId));
                        break;
                    case 'catalog_button-minus_cart':
                        cartAction.decreaseNumber(Number(itemId));
                        break;
                    case 'catalog_button-plus_cart':
                        cartAction.increaseNumber(Number(itemId));
                        break;
                    case 'catalog_like-button':
                    /* Запрос на добавление товара в избраннное */
                        break;
                    }
                } else {
                    switch (elementId) {
                    case 'catalog-item-pic':
                    /* Переход на страницу товара по ссылке в комменте выше */

                        break;
                    case 'catalog_item-title':
                    /* Переход на страницу товара по ссылке в комменте выше */
                        break;
                    }
                }
            }
        }
    }

    /**
     * Функция, обрабатывающая скролл на странице
     * Когда скролл достигает 0.8 части страницы мы вызываем экшен на загрузку новых товаров.
     * setTimeout для того, чтобы экшен вызывался не миллион раз в секунду, а лишь один раз в 300 мс
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
     * Функция, реагирующая на кнопки сортировки.
     *  @param event - событие, вызвавшее клик.
     */
    listenSortCatalog(event: Event) {
        if (event.target instanceof HTMLElement) {
            switch (event.target.id) {
            case 'catalog_sort-rating': {
                const isLowToHighRating =
                    window.location.search.includes(config.queryParams.sort.ratingDown);
                isLowToHighRating ?
                    this.ratingSortImg?.classList.remove('rotate-img-180') :
                    this.ratingSortImg?.classList.add('rotate-img-180');
                this.getSortByRating(isLowToHighRating);
                break;
            }
            case 'catalog_sort-price': {
                const isLowToHighPrice =
                    window.location.search.includes(config.queryParams.sort.priceDown);
                isLowToHighPrice ?
                    this.priceSortImg?.classList.remove('rotate-img-180') :
                    this.priceSortImg?.classList.add('rotate-img-180');
                this.getSortByPrice(isLowToHighPrice);
                break;
            }
            }
        }
    }

    /**
     * Метод, добавляющий слушатели
     */
    override startEventListener() {
        this.catalogContent = document.getElementById('catalog_content');
        if (this.catalogContent) {
            this.catalogContent.addEventListener('click', this.localEventListenersHandler);
        }

        this.waitThrottleScroll = false;
        this.bottomOfPageHandler = this.bottomOfPageHandlerPrototype.bind(this);

        this.catalogSort = document.getElementById('catalog_sort-buttons');
        if (this.catalogSort) {
            this.addLisitenSortCatalog = this.listenSortCatalog.bind(this);
            this.catalogSort.addEventListener('click', this.addLisitenSortCatalog);
        }
    }

    /**
     * Метод, добавляющий слушатель на скролл.
     */
    startScrollListener() {
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
    override removeEventListener() {
        if (this.catalogContent) {
            this.catalogContent.removeEventListener('click', this.localEventListenersHandler);
        }

        if (this.catalogSort) {
            this.catalogSort.removeEventListener('click', this.addLisitenSortCatalog);
        }
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    override render() {
        document.title = this.#category.get(window.location.pathname) + ' ' + document.title;

        super.render({category: this.#category.get(window.location.pathname)});
        cartAction.getCart();
        this.startEventListener();
        this.itemsBlock = document.getElementById('items-block');
        this.ratingSortImg = document.getElementById('catalog_sort-rating__img');
        this.priceSortImg = document.getElementById('catalog_sort-price__img');
    }
}
