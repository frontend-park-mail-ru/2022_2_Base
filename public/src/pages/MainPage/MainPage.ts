import mainPageTemplate from './MainPage.hbs';
import BasePage from '../BasePage';
import TopCategory from '../../components/TopCategory/TopCategory';
import './MainPage.scss';
import itemsStore from '../../stores/ItemsStore';
import {itemCardsAction, ItemCardsActionTypes} from '../../actions/itemCards';
import {config} from '../../config';
import {cartAction, CartActionTypes} from '../../actions/cart';
import cartStore from '../../stores/CartStore';
import errorMessage from '../../modules/ErrorMessage';
import HorizontalScrollCatalog from '../../components/HorizontalScrollCatalog/HorizontalScrollCatalog';

/**
 * Класс, реализующий главную страницу
 */
export default class MainPage extends BasePage {
    catalogContent: HTMLElement | null;
    topComponent: TopCategory | undefined;
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param parent - HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(
            parent,
            mainPageTemplate,
        );
        this.catalogContent = null;
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    override addListener() {
        cartStore.addListener(this.getCart.bind(this),
            CartActionTypes.GET_CART);
    }

    /**
     * Функция, реагирующая на получение товаров из корзины
     */
    getCart() {
        switch (cartStore.getContext(cartStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
        case config.responseCodes.code401: {
            const saleItemsRootElement = document.getElementById('content__sales');
            const popularItemsRootElement = document.getElementById('content__popular');
            const catalogContent = document.getElementById('content_main');
            if (saleItemsRootElement && popularItemsRootElement &&
                catalogContent instanceof HTMLElement) {
                const salesItems = new HorizontalScrollCatalog(saleItemsRootElement,
                    [itemsStore._storeNames.cardsHome, 'catalog', catalogContent,
                        ItemCardsActionTypes.ITEM_CARDS_GET_SALES, true]);
                salesItems.render();
                itemCardsAction.getSalesItemCards();

                const popularItems = new HorizontalScrollCatalog(popularItemsRootElement,
                    [itemsStore._storeNames.cardsHome, 'catalog', catalogContent,
                        ItemCardsActionTypes.ITEM_CARDS_GET_POPULAR]);
                popularItems.render();
                itemCardsAction.getPopularItemCards();
            }
            break;
        }
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при загрузке данных корзины');
            break;
        }
    }

    /**
     * Функция, запускающая таймер скидки
     */
    startTimer() {
        const display = document.getElementById('main-page-sale-timer');
        if (display) {
            const start = new Date;
            start.setHours(3, 0, 0); // 3am

            const pad = (num: any) => {
                return ('0' + parseInt(num)).substr(-2);
            };
            const tick = () => {
                const now = new Date;
                if (now > start) { // too late, go to tomorrow
                    start.setDate(start.getDate() + 1);
                }
                const remain = ((Number(start) - Number(now)) / 1000);
                display.textContent =
                    pad((remain / 60 / 60) % 60) + ':' +
                    pad((remain / 60) % 60) + ':' +
                    pad(remain % 60);
                setTimeout(tick, 1000);
            };
            tick();
        } else {
            errorMessage.getAbsoluteErrorMessage('Ошибка таймера скидки');
        }
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    override render() {
        super.render(config);

        const catalogElement = document.getElementById('catalog');

        if (catalogElement) {
            this.topComponent = new TopCategory(catalogElement);
            this.topComponent.render(itemsStore.getContext(itemsStore._storeNames.topCategory));

            cartAction.getCart();
            this.startTimer();
        } else {
            errorMessage.getAbsoluteErrorMessage();
        }
    }
}
