'use strict';

import Dispatcher from '../modules/dispatcher';

/**
 * Константа, содержащая в себе типы действий с карточками товаров.
 */
export const ItemCardsActionTypes = {
    ITEM_CARDS_GET_HOME: 'ITEM_CARDS_GET_HOME',
    ITEM_CARDS_GET_BY_CATEGORY: 'ITEM_CARDS_GET_BY_CATEGORY',
    ITEM_CARDS_SEARCH: 'ITEM_CARDS_SEARCH',
    ITEM_CARD_GET: 'ITEM_CARD_GET',
};

/**
 * Класс, содержащий в себе действия с карточками товаров.
 */
export const itemCardsAction = {

    /**
     * Действие: запрос списка карточек.
     * @param {string} path - путь запроса
     * @param {boolean} selector
     */
    getHomeItemCards(path, selector) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARDS_GET_HOME,
            data: {
                path: path,
                popularCard: selector,
            },
        });
    },

    /**
     * Действие: запрос списка карточек по категориям.
     * @param {String} category - категория
     */
    getItemCardsByCategory(category) {
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
     * @param {number} id
     */
    getItemCard(id) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARD_GET,
            data: {id},
        });
    },
};
