'use strict';

import Dispatcher from '../modules/dispatcher.js';

/**
 * Константа, содержащая в себе типы действий с карточками товаров.
 */
export const ItemCardsActionTypes = {
    ITEM_CARDS_GET_BY_SALES: 'ITEM_CARDS_GET_BY_SALES',
    ITEM_CARDS_GET_POPULAR: 'ITEM_CARDS_GET_POPULAR',
    ITEM_CARDS_GET_BY_CATEGORY: 'ITEM_CARDS_GET_BY_CATEGORY',
    ITEM_CARDS_SEARCH: 'ITEM_CARDS_SEARCH',
    ITEM_CARD_GET: 'ITEM_CARD_GET',
    ITEM_CARD_CLICKED_BUY: 'ITEM_CARD_CLICKED_BUY',
};

/**
 * Класс, содержащий в себе действия с карточками товаров.
 */
export const ItemCardsAction = {
    /**
     * Действие: запрос списка карточек по скидке.
     */
    getSalesItemCards() {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARDS_GET_BY_SALES,
        });
    },

    /**
     * Действие: запрос списка популярных карточек.
     */
     getPopularItemCards() {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARDS_GET_POPULAR,
        });
    },

    /**
     * Действие: запрос списка карточек по категориям.
     * @param {String} category - категория
     */
    getItemCardsByCategory() {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARDS_GET_BY_CATEGORY,
            data: {category},
        });
    },

    /**
     * Действие: запрос списка карточек на основании ввода пользователя.
     * @param {String} searchString - строка для поиска
     */
    searchItemCards(searchString) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARDS_SEARCH,
            data: {searchString},
        });
    },

    /**
     * Действие: запрос карточки с определенным id.
     * @param {any} id
     */
    getItemCard(id) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARD_GET,
            data: {id},
        });
    },

    /**
     * Действие: Добавление карточки с определенным id в корзину.
     * @param {any} id
     */
    clickedByItemCard(id) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARD_CLICKED_BUY,
            data: {id},
        });
    },
};
