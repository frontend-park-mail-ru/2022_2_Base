import CatalogPage from '../CatalogPage';
import router from '../../../modules/Router';
import itemsStore from '../../../stores/ItemsStore';
import {itemCardsAction, ItemCardsActionTypes} from '../../../actions/itemCards';
import {config} from '../../../config';
import CatalogItemCard from '../../../components/CatalogItemCard/CatalogItemCard';
import refreshElements from '../../../modules/refreshElements';

/**
 * Класс для реализации компонента PaymentCard
 */
export default class CategoryPage extends CatalogPage {
    /**
     * Конструктор, создающий класс компонента PaymentCard
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent, [itemCardsAction.getItemCardsByCategory,
            itemCardsAction.getHighRatingItemCardsByCategory,
            itemCardsAction.getCheapItemCardsByCategory]);
    }


    /**
     * Функция, регистрирующая листенеры сторов
     */
    override addListener() {
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
        case config.responseCodes.code200: {
            const itemsBlock = document.getElementById('items-block');
            if (itemsBlock) {
                const Card = new CatalogItemCard(itemsBlock);
                const data = itemsStore.getContext(itemsStore._storeNames.cardsCategory);

                if (data.length) {
                    Card.render(data);
                } else if (
                    itemsStore.getContext(
                        itemsStore._storeNames.cardLoadCount) === config.states.endOf) {
                    this.removeScrollListener();
                } else if (document.location.pathname !== config.href.favourites) {
                    router.openNotFoundPage();
                } else {
                    refreshElements.showUnAuthPage({
                        text: 'Пока в избранном ничего нет. Может нужен',
                        linkToPage: itemsStore.getContext(
                            itemsStore._storeNames.topCategory).Computer.href,
                        linkText: 'компьютер',
                        textAfterLink: '?',
                    });
                }
            }
            break;
        }
        default:
            router.openNotFoundPage();
            break;
        }
    }

    /**
     * Функция, подгружающая и отрисовывающая карточки дешевых товаров
     */
    loadSortedItemCards() {
        if (this.itemsBlock) {
            router.addToHistory(window.location.pathname +
                itemsStore.getContext(itemsStore._storeNames.sortURL));
            itemCardsAction.getItemCardsByCategory(true);
            this.removeScrollListener();
            this.startScrollListener();
        }
    }

    /**
     * Метод, добавляющий слушатели
     */
    override startEventListener() {
        super.startEventListener();
        super.startScrollListener();
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
        super.removeEventListener();
        super.removeScrollListener();
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    override render() {
        this.addListener();
        super.render();
    }
}
