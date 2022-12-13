import CatalogPage from '../CatalogPage';
import {itemCardsAction, ItemCardsActionTypes} from '../../../actions/itemCards';
import itemsStore from '../../../stores/ItemsStore';
import CatalogItemCard from '../../../components/CatalogItemCard/CatalogItemCard';
import {config} from '../../../config';
import router from '../../../modules/Router';
import refreshElements from '../../../modules/refreshElements';
import validation from '../../../modules/validation';
import errorMessage from '../../../modules/ErrorMessage';
import {getQueryParams} from '../../../modules/sharedFunctions';

/**
 * Класс для реализации компонента PaymentCard
 */
export default class SearchPage extends CatalogPage {
    /**
     * Конструктор, создающий класс компонента PaymentCard
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent, [itemCardsAction.searchItemCards,
            itemCardsAction.localSortRating, itemCardsAction.localSortPrice]);
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    override addListener() {
        super.addListener();
        itemsStore.addListener(this.loadSearchItemCards.bind(this),
            ItemCardsActionTypes.ITEM_CARDS_SEARCH);

        itemsStore.addListener(this.listenSearchRequest.bind(this),
            ItemCardsActionTypes.GET_SEARCH_RESULTS);

        itemsStore.addListener(this.sortCards.bind(this),
            ItemCardsActionTypes.LOCAL_SORT_RATING);

        itemsStore.addListener(this.sortCards.bind(this),
            ItemCardsActionTypes.LOCAL_SORT_PRICE);
    }

    /**
     * Функция, обрабатывающая результат запроса на поиск.
     */
    listenSearchRequest() {
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            super.render();
            break;
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при поиске. Попробуйте позже');
        }
    }

    /**
     * Функция, подгружающая и отрисовывающая карточки товаров
     * @param searchResult - результаты поиска
     */
    loadSearchItemCards(searchResult = itemsStore.getContext(itemsStore._storeNames.cardsCategory)) {
        const itemsBlock = document.getElementById('items-block');
        if (searchResult && searchResult.length && itemsBlock) {
            const Card = new CatalogItemCard(itemsBlock);
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
        if (this.itemsBlock) {
            // this.itemsBlock.innerHTML = '';
            router.addToHistory(window.location.pathname +
                itemsStore.getContext(itemsStore._storeNames.sortURL));
            this.loadSearchItemCards();
        }
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    override render() {
        const searchString = (getQueryParams() as any).q ?? '';
        const errorMessageSearch = validation.validateSearchField(searchString);
        if (errorMessageSearch === '') {
            this.addListener();
            itemCardsAction.getSearchResults(searchString);
        } else if (errorMessageSearch) {
            errorMessage.getAbsoluteErrorMessage(errorMessageSearch);
        } else {
            super.render();
        }
    }
}
