import CatalogPage from '../CatalogPage';
import {itemCardsAction, ItemCardsActionTypes} from '../../../actions/itemCards';
import itemsStore from '../../../stores/ItemsStore';
import CatalogItemCard from '../../../components/CatalogItemCard/CatalogItemCard';
import {config} from '../../../config';
import router from '../../../modules/Router';
import refreshElements from '../../../modules/refreshElements';

/**
 * Класс для реализации компонента PaymentCard
 */
export default class SearchPage extends CatalogPage {
    /**
     * Конструктор, создающий класс компонента PaymentCard
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent, [itemCardsAction.searchItemCards,
            itemCardsAction.localSortRating, itemCardsAction.localSortPrice]);
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        super.addListener();
        itemsStore.addListener(this.loadSearchItemCards.bind(this),
            ItemCardsActionTypes.ITEM_CARDS_SEARCH);
        itemsStore.addListener(this.sortCards.bind(this),
            ItemCardsActionTypes.LOCAL_SORT_RATING);
        itemsStore.addListener(this.sortCards.bind(this),
            ItemCardsActionTypes.LOCAL_SORT_PRICE);
    }

    /**
     * Функция, подгружающая и отрисовывающая карточки товаров
     * @param {Array} searchResult результаты поиска
     */
    loadSearchItemCards(searchResult = itemsStore.getContext(itemsStore._storeNames.cardsCategory)) {
        if (searchResult && searchResult.length) {
            const Card = new CatalogItemCard(document.getElementById('items-block'));
            Card.render(searchResult);
        } else {
            refreshElements.showUnAuthPage({
                text: 'Ничего не найдено. Может посмотрите',
                linkToPage: config.href.main,
                linkText: 'товары',
                textAfterLink: '&nbspпо скидке?',
            });
        }
    }

    /**
     * Функция, сортирующая товары по цене
     */
    sortCards() {
        this.itemsBlock.innerHTML = '';
        router.addToHistory(window.location.pathname +
            itemsStore.getContext(itemsStore._storeNames.sortURL));
        this.loadSearchItemCards();
    }
}
