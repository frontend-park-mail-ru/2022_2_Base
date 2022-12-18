import HorizontalScrollCatalogTemplate from './HorizontalScrollCatalog.hbs';
import BaseComponent from '../BaseComponent';
import itemsStore from '../../stores/ItemsStore';
import ItemCard from '../ItemCard/ItemCard';
import errorMessage from '../../modules/ErrorMessage';
import cartStore from '../../stores/CartStore';
import {parseIntInPrice} from '../../modules/sharedFunctions';
import {cartAction, CartActionTypes} from '../../actions/cart';
import './HorizontalScrollCatalog.scss';
import {config} from '../../config';
import {addEventListenerFunction} from '../../../../types/aliases';

/**
 * Класс для реализации компонента ItemCard
 */
export default class HorizontalScrollCatalog extends BaseComponent {
    storeNameForCards: string;
    errorMessageElementID: string;
    catalogContent: HTMLElement;
    ActionNameLoadCards: string;
    isFirstElement: boolean;
    parent: HTMLElement;

    bindListenLeftScrollButtonClick: addEventListenerFunction;
    bindListenRightScrollButtonClick: addEventListenerFunction;
    leftScrollButton: HTMLElement | null;
    rightScrollButton: HTMLElement | null;

    scrollItemsElement: HTMLElement;

    /**
     * Конструктор, создающий класс компонента ItemCard
     * @param parent - HTML-элемент, в который будет
     * @param childClassData - данные дочернего класса
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement, childClassData: Array<any>) {
        super(parent);
        this.parent = parent;
        [this.storeNameForCards, this.errorMessageElementID,
            this.catalogContent, this.ActionNameLoadCards, this.isFirstElement = false] =
            childClassData;

        this.bindListenLeftScrollButtonClick = config.noop;
        this.bindListenRightScrollButtonClick = config.noop;
        this.leftScrollButton = null;
        this.rightScrollButton = null;
        this.scrollItemsElement = config.empyNode;
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        itemsStore.addListener(this.loadCards.bind(this),
            this.ActionNameLoadCards);

        if (this.isFirstElement) {
            cartStore.addListener(this.buttonCreate,
                CartActionTypes.ADD_TO_CART);

            cartStore.addListener(this.buttonAdd,
                CartActionTypes.INCREASE_NUMBER,
            );

            cartStore.addListener(this.buttonMinus,
                CartActionTypes.DECREASE_NUMBER,
            );
        }
    }

    /**
     /**
     * Метод, загружающий карты.
     */
    loadCards() {
        const response = itemsStore.getContext(this.storeNameForCards);
        if (itemsStore.getContext(itemsStore._storeNames.responseCode) ===
            config.responseCodes.code200) {
            response.forEach((card: any, num: number) => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('item-card');
                this.scrollItemsElement.appendChild(cardElement);
                const itemCard = new ItemCard(cardElement);
                itemCard.render(card);
            });
        } else if (!document.getElementById('ServerLoadError')) {
            const errorElement = document.getElementById(this.errorMessageElementID);
            if (errorElement) {
                errorMessage.getServerMessage(errorElement, 'ServerLoadError',
                    'Возникла ошибка при загрузке товаров. Попробуйте позже', true);
            }
        }
    }

    /**
     * Функция, обрабатывающая клики на данной странице
     * @param event - контекст события для обработки
     */
    itemEventListenerClickHandler(event: Event) {
        event.preventDefault();
        if (event.target instanceof HTMLElement) {
            const dataSelection = event.target.getAttribute('data-selection');
            if (dataSelection) {
                const [elementId, itemId] = dataSelection.split('/');
                switch (elementId) {
                case 'itemcard_button-add-to-cart':
                    cartAction.addToCart(Number(itemId));
                    break;
                case 'itemcard_button-minus_cart':
                    cartAction.decreaseNumber(Number(itemId));
                    break;
                case 'itemcard_button-plus_cart':
                    cartAction.increaseNumber(Number(itemId));
                    break;
                }
            }
        }
    }

    /**
     * Функция, первоначально добавляет товар в корзину
     */
    buttonCreate() {
        const countSelector = document.querySelectorAll(
            '[data-selection=\'itemcard_amount-selector/' +
            cartStore.getContext(cartStore._storeNames.currID) + '\']');
        const addToCartButton = document.querySelectorAll(
            '[data-selection=\'itemcard_button-add-to-cart/' +
            cartStore.getContext(cartStore._storeNames.currID) + '\']');
        if (!!addToCartButton && !!countSelector) {
            countSelector.forEach((selector) =>
                (selector as HTMLElement).style.display = 'grid');
            addToCartButton.forEach((button) =>
                (button as HTMLElement).style.display = 'none');

            const itemCount = document.querySelectorAll(
                '[data-selection=\'itemcard_item-count/' +
                cartStore.getContext(cartStore._storeNames.currID) + '\']');
            if (itemCount) {
                itemCount.forEach((item) => item.textContent = '1');
            }
        }
    }

    /**
     * Функция для увеличения количества товара в корзине
     */
    buttonAdd() {
        const itemCount = document.querySelectorAll(
            '[data-selection=\'itemcard_item-count/' +
            cartStore.getContext(cartStore._storeNames.currID) + '\']');
        if (itemCount.length) {
            const count = parseIntInPrice(itemCount[0].textContent ?? '');
            itemCount.forEach((item) => item.textContent = (count + 1).toString());
        }
    }

    /**
     * Функция для уменьшения количества товара в корзине
     */
    buttonMinus() {
        const itemCount = document.querySelectorAll(
            '[data-selection=\'itemcard_item-count/' +
            cartStore.getContext(cartStore._storeNames.currID) + '\']');
        if (itemCount.length) {
            const count = parseIntInPrice(itemCount[0].textContent ?? '');

            if (count === 1) {
                const countSelector = document.querySelectorAll(
                    '[data-selection=\'itemcard_amount-selector/' +
                    cartStore.getContext(cartStore._storeNames.currID) + '\']');
                const addToCartButton = document.querySelectorAll(
                    '[data-selection=\'itemcard_button-add-to-cart/' +
                    cartStore.getContext(cartStore._storeNames.currID) + '\']');
                if (!!addToCartButton && !!countSelector) {
                    countSelector.forEach((selector) =>
                        (selector as HTMLElement).style.display = 'none');
                    addToCartButton.forEach((button) =>
                        (button as HTMLElement).style.display = 'flex');
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
     * Функция, делающая скролл элементов в "карусели" влево или вправо.
     * @param isLeftScroll - должна ли кнопка скроллить влево
     */
    async listenScrollButtonClick(isLeftScroll = false) {
        const scrollFunc = (isLeftScroll ?
            (i: number) => this.scrollItemsElement.scrollLeft -= 8 :
            (i: number) => this.scrollItemsElement.scrollLeft += 8);
        for (const i of Array.from(Array(10).keys())) {
            scrollFunc(i);
            await new Promise((r) => setTimeout(r, 1));
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        if (this.catalogContent && this.isFirstElement) {
            this.catalogContent.addEventListener('click', this.itemEventListenerClickHandler);
        }

        this.leftScrollButton = document.getElementById('left-scroll__'+ this.parent.id);
        if (this.leftScrollButton) {
            this.bindListenLeftScrollButtonClick = this.listenScrollButtonClick.bind(this, true);
            this.leftScrollButton.addEventListener('click', this.bindListenLeftScrollButtonClick);
        }

        this.rightScrollButton = document.getElementById('right-scroll__'+ this.parent.id);
        if (this.rightScrollButton) {
            this.bindListenRightScrollButtonClick = this.listenScrollButtonClick.bind(this, false);
            this.rightScrollButton.addEventListener('click', this.bindListenRightScrollButtonClick);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
        if (this.catalogContent && this.isFirstElement) {
            this.catalogContent.removeEventListener('click', this.itemEventListenerClickHandler);
        }

        if (this.rightScrollButton) {
            this.rightScrollButton.removeEventListener('click', this.bindListenRightScrollButtonClick);
        }

        if (this.leftScrollButton) {
            this.leftScrollButton.removeEventListener('click', this.bindListenLeftScrollButtonClick);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
     */
    override render() {
        super.render({id: this.parent.id},
            HorizontalScrollCatalogTemplate);

        this.scrollItemsElement = document.
            getElementById(`content__horizontal-scroll_${this.parent.id}`) ??
            config.empyNode;

        this.addListener();
        this.startEventListener();
    }
}
