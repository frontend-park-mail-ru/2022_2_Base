'use strict';

import Dispatcher from '../modules/dispatcher';

/**
 * Константа, содержащая в себе типы действий с карточками товаров.
 */
export const ItemCardsActionTypes = {
    ITEM_CARDS_GET_SALES: 'ITEM_CARDS_GET_SALES',
    ITEM_CARDS_GET_POPULAR: 'ITEM_CARDS_GET_POPULAR',
    ITEM_CARDS_GET_RECOMMENDED: 'ITEM_CARDS_GET_RECOMMENDED',
    ITEM_CARDS_GET_BY_CATEGORY: 'ITEM_CARDS_GET_BY_CATEGORY',
    ITEM_CARDS_SEARCH: 'ITEM_CARDS_SEARCH',
    ITEM_CARD_GET: 'ITEM_CARD_GET',
    POPULAR_ITEM_CARDS_GET_BY_CATEGORY: 'POPULAR_ITEM_CARDS_GET_BY_CATEGORY',
    CHEAP_ITEM_CARDS_GET_BY_CATEGORY: 'CHEAP_ITEM_CARDS_GET_BY_CATEGORY',
    HIGH_RATING_ITEM_CARDS_GET_BY_CATEGORY: 'HIGH_RATING_ITEM_CARDS_GET_BY_CATEGORY',
    ADD_COMMENT: 'ADD_COMMENT',
    GET_COMMENTS: 'GET_COMMENTS',
    GET_SEARCH_RESULTS: 'GET_SEARCH_RESULTS',
    LOCAL_SORT_RATING: 'LOCAL_SORT_RATING',
    LOCAL_SORT_PRICE: 'LOCAL_SORT_PRICE',
    GET_SUGGESTION_SEARCH: 'GET_SUGGESTION_SEARCH',
    BEST_OFFER_ITEM_GET: 'BEST_OFFER_ITEM_GET',
};

/**
 * Класс, содержащий в себе действия с карточками товаров.
 */
export const itemCardsAction = {

    /**
     * Действие: запрос списка карточек.
     */
    getSalesItemCards() {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARDS_GET_SALES,
        });
    },

    /**
     * Действие: запрос списка карточек.
     */
    getPopularItemCards() {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARDS_GET_POPULAR,
        });
    },

    /**
     * Действие: запрос списка карточек
     * @param id - идентификатор товара для рекомендаций
     */
    getRecommendedItemCards(id: number) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARDS_GET_RECOMMENDED,
            data: id,
        });
    },

    /**
     * Действие: запрос списка карточек по категориям.
     * @param isFirstRequest - нужно ли обнулять счётчик запросов
     */
    getItemCardsByCategory(isFirstRequest: boolean) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARDS_GET_BY_CATEGORY,
            data: isFirstRequest,
        });
    },

    /**
     * Действие: запрашивает популярные карты в конкретной категории
     * @param isFirstRequest - нужно ли обнулять счётчик запросов
     */
    getPopularItemCardsByCategory(isFirstRequest: boolean) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.POPULAR_ITEM_CARDS_GET_BY_CATEGORY,
            data: isFirstRequest,
        });
    },

    /**
     * Действие: запрашивает дешевые карты в конкретной категории
     * @param isLowToHigh - порядок сортировки
     */
    getCheapItemCardsByCategory(isLowToHigh: boolean) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.CHEAP_ITEM_CARDS_GET_BY_CATEGORY,
            data: isLowToHigh,
        });
    },

    /**
     * Действие: запрашивает популярные карты в конкретной категории
     * @param isLowToHigh - порядок сортировки
     */
    getHighRatingItemCardsByCategory(isLowToHigh: boolean) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.HIGH_RATING_ITEM_CARDS_GET_BY_CATEGORY,
            data: isLowToHigh,
        });
    },

    /**
     * Действие: запрашивает дешевые карты в конкретной категории
     * @param isLowToHigh - порядок сортировки
     */
    localSortRating(isLowToHigh: boolean) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.LOCAL_SORT_RATING,
            data: isLowToHigh,
        });
    },

    /**
     * Действие: запрашивает популярные карты в конкретной категории
     * @param isLowToHigh - порядок сортировки
     */
    localSortPrice(isLowToHigh: boolean) {
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
     * Действие: запрос карточки с определенным id.
     */
    getItemCard() {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ITEM_CARD_GET,
        });
    },

    /**
     * Действие: запрос карточки с наиболее выгодным предложением.
     */
    getBestOfferCard() {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.BEST_OFFER_ITEM_GET,
        });
    },

    /**
     * Действие: запрос списка карточек на основании ввода пользователя.
     * @param searchString - строка для поиска
     */
    getSearchResults(searchString: string) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.GET_SEARCH_RESULTS,
            data: searchString,
        });
    },

    /**
     * Действие: запрос списка карточек на основании ввода пользователя.
     */
    getComments() {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.GET_COMMENTS,
        });
    },

    /**
     * Действие: запрос списка саджестов на основании ввода пользователя.
     * @param searchString - строка для поиска
     * @param isCategory - идет поиск по категориям или нет
     */
    getSuggestionSearch(searchString: string, isCategory = false) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.GET_SUGGESTION_SEARCH,
            data: {searchString: searchString, isCategory: isCategory},
        });
    },

    /**
     * Действие: запрос списка карточек на основании ввода пользователя.
     * @param comment - данные отзыва
     */
    addComment(comment: object) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.ADD_COMMENT,
            data: comment,
        });
    },
};
