import BasePage from '../BasePage';
import cartStore from '../../stores/CartStore';
import {cartAction, CartActionTypes} from '../../actions/cart';
import {config} from '../../config';
import {itemCardsAction, ItemCardsActionTypes} from '../../actions/itemCards';
import itemsStore from '../../stores/ItemsStore';
import errorMessage from '../../modules/ErrorMessage';
import CatalogPageTemplate from './CatalogPage.hbs';
import './CatalogPage.scss';
import {getQueryParams} from '../../modules/sharedFunctions';
import {likesAction, LikesActionTypes} from '../../actions/likes';
import userStore from '../../stores/UserStore';
import ItemCard from '../../components/ItemCard/ItemCard';

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
    sortOrder: HTMLElement | null;
    waitThrottleScroll: boolean;
    #category;

    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param parent - HTML-элемент, в который будет осуществлена отрисовка
     * @param childClassData - данные дочернего класса
     */
    protected constructor(parent: HTMLElement, childClassData: [actionFunc, actionFunc, actionFunc]) {
        super(parent, CatalogPageTemplate);

        [this.actionToLoadCards, this.getSortByRating, this.getSortByPrice] = childClassData;

        this.addLisitenSortCatalog = config.noop;
        this.bottomOfPageHandler = config.noop;

        this.catalogContent = null;
        this.catalogSort = null;
        this.itemsBlock = null;
        this.sortOrder = null;
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
        this.#category.set(config.href.favourites, 'Избранное');
        this.#category.set(config.href.search, 'Поиск');
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    override addListener() {
        cartStore.addListener(this.buttonCreate,
            CartActionTypes.ADD_TO_CART);

        cartStore.addListener(this.buttonAdd,
            CartActionTypes.INCREASE_NUMBER);

        cartStore.addListener(this.buttonMinus,
            CartActionTypes.DECREASE_NUMBER);

        itemsStore.addListener(this.listenLike,
            LikesActionTypes.LIKE);

        itemsStore.addListener(this.listenLike,
            LikesActionTypes.DISLIKE);

        cartStore.addListener(this.getCart.bind(this),
            CartActionTypes.GET_CART);

        itemsStore.addListener(this.renderBestOffer,
            ItemCardsActionTypes.BEST_OFFER_ITEM_GET);
    }

    /**
     * Функция, реагирующая на получение товаров из корзины
     */
    getCart() {
        switch (cartStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
        case config.responseCodes.code401:
            this.actionToLoadCards(true);
            itemCardsAction.getBestOfferCard();
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
     * Функция, реагирует на ответ сервера при лайке
     */
    listenLike() {
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            break;
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при изменении избранного');
        }
    }

    /**
     * Функция, обрабатывающая клики на данной странице
     * @param event - событие, вызвавшее обработчик
     */
    localEventListenersHandler(event: Event) {
        const target = event.target;
        if (target instanceof HTMLElement && target.id.includes('/')) {
            const [elementId, itemId] = target.id.split('/');
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
                if (target instanceof HTMLInputElement &&
                userStore.getContext(userStore._storeNames.isAuth)) {
                    target.checked ?
                        likesAction.like(Number(itemId)) :
                        likesAction.dislike(Number(itemId));
                } else {
                    event.preventDefault();
                    errorMessage.
                        getAbsoluteNotificationMessage(
                            'Чтобы добавить в избранное войдите');
                }
                break;
            }
        }
    }

    /**
     * Функция, рендрит карточку с лучшим предложением
     */
    renderBestOffer() {
        const bestOfferElement = document.getElementById('best-offer-item');
        if (bestOfferElement) {
            // console.log(itemsStore.getContext(itemsStore._storeNames.itemData));
            const bestOfferItem = new ItemCard(bestOfferElement);
            const data = itemsStore.getContext(itemsStore._storeNames.itemData);
            data.catalog = true;
            bestOfferItem.render(data);
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
        if (event.target instanceof HTMLElement && this.sortOrder) {
            this.sortOrder.classList.add('sort-rating__img_visible');
            switch (event.target.id) {
            case 'catalog_sort-rating': {
                const isLowToHighRating =
                    window.location.search.includes(config.queryParams.sort.ratingDown);
                isLowToHighRating ?
                    this.sortOrder.classList.add('rotate-img-180') :
                    this.sortOrder.classList.remove('rotate-img-180');
                this.getSortByRating(isLowToHighRating);
                break;
            }
            case 'catalog_sort-price': {
                const isLowToHighPrice =
                    window.location.search.includes(config.queryParams.sort.priceDown);
                isLowToHighPrice ?
                    this.sortOrder.classList.add('rotate-img-180') :
                    this.sortOrder.classList.remove('rotate-img-180');
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
        this.sortOrder = document.getElementById('catalog_sort-img');

        const sortParam = getQueryParams().sort?.toString();
        if (sortParam) {
            if (sortParam.includes('up')) {
                this.sortOrder?.classList.add('sort-rating__img_visible');
                this.sortOrder?.classList.add('rotate-img-180');
            } else {
                this.sortOrder?.classList.add('sort-rating__img_visible');
            }
        }
    }
}
