import ProductPagePageTemplate from './ProductPage.hbs';
import './ProductPage.scss';
import BaseItemPage from '../BaseItemPage';
import {itemCardsAction, ItemCardsActionTypes} from '../../../actions/itemCards';
import {getDate} from '../../../modules/sharedFunctions';
import HorizontalScrollCatalog
    from '../../../components/HorizontalScrollCatalog/HorizontalScrollCatalog';
import itemsStore from '../../../stores/ItemsStore';

/**
 * Класс, реализующий страницу ProductPage.
 */
export default class ProductPage extends BaseItemPage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param parent - HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(
            parent,
            ProductPagePageTemplate,
            [itemCardsAction.getItemCard, ItemCardsActionTypes.ITEM_CARD_GET,
                'product'],
        );
    }

    /**
     * Функция, загружающая дополнительные данные
     * @param data - объект для добавления данных
     */
    override loadMoreData(data: {delveryDate: string, id: number}) {
        data.delveryDate = getDate(1)[0];

        const recommendedItemsRootElement = document.getElementById('item-card__recommendation');
        if (recommendedItemsRootElement) {
            const recommendedItems = new HorizontalScrollCatalog(recommendedItemsRootElement,
                [itemsStore._storeNames.cardsHome, recommendedItemsRootElement,
                    recommendedItemsRootElement,
                    ItemCardsActionTypes.ITEM_CARDS_GET_RECOMMENDED, true]);
            recommendedItems.render();
            itemCardsAction.getRecommendedItemCards(data.id);
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    override startEventListener() {}

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {}
}
