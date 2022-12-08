import ProductPagePageTemplate from './ProductPage.hbs';
import './ProductPage.scss';
import BaseItemPage from '../BaseItemPage';
import {itemCardsAction, ItemCardsActionTypes} from '../../../actions/itemCards';
import {getDate} from '../../../modules/sharedFunctions';

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
    override loadMoreData(data: {delveryDate: string}) {
        data.delveryDate = getDate(1)[0];
    }

    /**
     * Метод, добавляющий слушатели.
     */
    override startEventListener() {
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
    }
}
