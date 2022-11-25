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
    POPULAR_ITEM_CARDS_GET_BY_CATEGORY: 'POPULAR_ITEM_CARDS_GET_BY_CATEGORY',
    CHEAP_ITEM_CARDS_GET_BY_CATEGORY: 'CHEAP_ITEM_CARDS_GET_BY_CATEGORY',
    HIGH_RATING_ITEM_CARDS_GET_BY_CATEGORY: 'HIGH_RATING_ITEM_CARDS_GET_BY_CATEGORY',
    ADD_COMMENT: 'ADD_COMMENT',
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
     * @param {boolean} isFirstRequest - нужно ли обнулять счётчик запросов
     */
    getItemCardsByCategory(isFirstRequest) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARDS_GET_BY_CATEGORY,
            data: isFirstRequest,
        });
    },

    /**
     * Действие: запрашивает популярные карты в конкретной категории
     * @param {boolean} isFirstRequest - нужно ли обнулять счётчик запросов
     */
    getPopularItemCardsByCategory(isFirstRequest) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.POPULAR_ITEM_CARDS_GET_BY_CATEGORY,
            data: isFirstRequest,
        });
    },

    /**
     * Действие: запрашивает дешевые карты в конкретной категории
     * @param {boolean} isFirstRequest - нужно ли обнулять счётчик запросов
     */
    getCheapItemCardsByCategory(isFirstRequest) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.CHEAP_ITEM_CARDS_GET_BY_CATEGORY,
            data: isFirstRequest,
        });
    },

    /**
     * Действие: запрашивает популярные карты в конкретной категории
     * @param {boolean} isFirstRequest - нужно ли обнулять счётчик запросов
     */
    getHighRatingItemCardsByCategory(isFirstRequest) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.HIGH_RATING_ITEM_CARDS_GET_BY_CATEGORY,
            data: isFirstRequest,
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
    getItemCard() {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARD_GET,
        });
    },

    /**
     * Действие: запрос списка карточек на основании ввода пользователя.
     * @param {object} comment - данные отзыва
     */
    addComment(comment) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ADD_COMMENT,
            data: comment,
        });
    },
};
