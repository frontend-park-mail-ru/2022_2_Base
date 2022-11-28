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
    GET_SEARCH_RESULTS: 'GET_SEARCH_RESULTS',
    LOCAL_SORT_RATING: 'LOCAL_SORT_RATING',
    LOCAL_SORT_PRICE: 'LOCAL_SORT_PRICE',
    GET_SUGGESTION_SEARCH: 'GET_SUGGESTION_SEARCH',
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
     * @param {boolean} isLowToHigh - порядок сортировки
     */
    getCheapItemCardsByCategory(isLowToHigh) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.CHEAP_ITEM_CARDS_GET_BY_CATEGORY,
            data: isLowToHigh,
        });
    },

    /**
     * Действие: запрашивает популярные карты в конкретной категории
     * @param {boolean} isLowToHigh - порядок сортировки
     */
    getHighRatingItemCardsByCategory(isLowToHigh) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.HIGH_RATING_ITEM_CARDS_GET_BY_CATEGORY,
            data: isLowToHigh,
        });
    },

    /**
     * Действие: запрашивает дешевые карты в конкретной категории
     * @param {boolean} isLowToHigh - порядок сортировки
     */
    localSortRating(isLowToHigh) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.LOCAL_SORT_RATING,
            data: isLowToHigh,
        });
    },

    /**
     * Действие: запрашивает популярные карты в конкретной категории
     * @param {boolean} isLowToHigh - порядок сортировки
     */
    localSortPrice(isLowToHigh) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.LOCAL_SORT_PRICE,
            data: isLowToHigh,
        });
    },

    /**
     * Действие: запрос списка карточек на основании ввода пользователя.
     */
    searchItemCards() {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARDS_SEARCH,
        });
    },

    /**
     * Действие: запрос списка карточек на основании ввода пользователя.
     * @param {String} searchString - строка для поиска
     */
    getSearchResults(searchString) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.GET_SEARCH_RESULTS,
            data: searchString,
        });
    },

    /**
     * Действие: запрос списка саджестов на основании ввода пользователя.
     * @param {String} searchString - строка для поиска
     */
    getSuggestionSearch(searchString) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.GET_SUGGESTION_SEARCH,
            data: searchString,
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
