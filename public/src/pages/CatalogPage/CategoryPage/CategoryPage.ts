import CatalogPage from '../CatalogPage';
import router from '../../../modules/Router';
import itemsStore from '../../../stores/ItemsStore';
import {itemCardsAction, ItemCardsActionTypes} from '../../../actions/itemCards';
import {config} from '../../../config';
import CatalogItemCard from '../../../components/CatalogItemCard/CatalogItemCard';

/**
 * Класс для реализации компонента PaymentCard
 */
export default class CategoryPage extends CatalogPage {
    /**
     * Конструктор, создающий класс компонента PaymentCard
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: any) {
        super(parent, [itemCardsAction.getItemCardsByCategory,
            itemCardsAction.getHighRatingItemCardsByCategory,
            itemCardsAction.getCheapItemCardsByCategory]);
    }


    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        super.addListener();
        itemsStore.addListener(this.loadCatalogItemCards.bind(this),
            ItemCardsActionTypes.ITEM_CARDS_GET_BY_CATEGORY);

        itemsStore.addListener(this.loadSortedItemCards.bind(this),
            ItemCardsActionTypes.HIGH_RATING_ITEM_CARDS_GET_BY_CATEGORY);

        itemsStore.addListener(this.loadSortedItemCards.bind(this),
            ItemCardsActionTypes.CHEAP_ITEM_CARDS_GET_BY_CATEGORY);
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
     * Функция, подгружающая и отрисовывающая карточки дешевых товаров
     */
    loadSortedItemCards() {
        router.addToHistory(window.location.pathname +
            itemsStore.getContext(itemsStore._storeNames.sortURL));
        this.itemsBlock.innerHTML = '';
        itemCardsAction.getItemCardsByCategory(true);
        this.removeScrollListener();
        this.startScrollListener();
    }

    /**
     * Метод, добавляющий слушатели
     */
    startEventListener() {
        super.startEventListener();
        super.startScrollListener();
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        super.removeEventListener();
        super.removeScrollListener();
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    render() {
        this.addListener();
        super.render();
    }
}
