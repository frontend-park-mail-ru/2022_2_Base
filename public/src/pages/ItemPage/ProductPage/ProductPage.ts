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
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            ProductPagePageTemplate,
            [itemCardsAction.getItemCard, ItemCardsActionTypes.ITEM_CARD_GET,
                'product'],
        );
    }

    /**
     * Функция, загружающая дополнительные данные
     * @param {object} data объект для добавления данных
     */
    loadMoreData(data) {
        data.delveryDate = getDate(1)[0];
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
    }
};
