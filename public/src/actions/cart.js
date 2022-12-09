'use strict';

import Dispatcher from '../modules/dispatcher';

/**
 * Константа, содержащая в себе типы действий в корзине.
 */
export const CartActionTypes = {
    GET_CART: 'GET_CART',
    DELETE_BY_ID: 'DELETE_BY_ID',
    DELETE_ALL: 'DELETE_ALL',
    MAKE_ORDER: 'MAKE_ORDER',
    ADD_TO_CART: 'ADD_TO_CART',
    INCREASE_NUMBER: 'INCREASE_NUMBER',
    DECREASE_NUMBER: 'DECREASE_NUMBER',
    RESET_CART: 'RESET_CART',
    MERGE_CART: 'MERGE_CART',
    APPLY_PROMOCODE: 'APPLY_PROMOCODE',
};

/**
 * Класс, содержащий в себе действия в корзине.
 */
export const cartAction = {
    /**
     * Действие: выбрать все товары в корзине.
     */
    getCart() {
        Dispatcher.dispatch({
            actionName: CartActionTypes.GET_CART,
        });
    },

    /**
     * Действие: удалить товар по ID.
     * @param {number} id
     */
    deleteById(id) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.DELETE_BY_ID,
            data: id,
        });
    },

    /**
     * Действие: удалить товар по ID.
     */
    deleteAll() {
        Dispatcher.dispatch({
            actionName: CartActionTypes.DELETE_ALL,
        });
    },

    /**
     * Действие: увеличить количество товара.
     * @param {number} id
     */
    increaseNumber(id) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.INCREASE_NUMBER,
            data: id,
        });
    },

    /**
     * Действие: уменьшить количество товара.
     * @param {number} id
     */
    decreaseNumber(id) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.DECREASE_NUMBER,
            data: id,
        });
    },

    /**
     * Действие: увеличить количество товара.
     * @param {number} id
     */
    addToCart(id) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.ADD_TO_CART,
            data: id,
        });
    },

    /**
     * Действие: оформить заказ
     * @param {object} data - данные для обработки
     */
    makeOrder(data) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.MAKE_ORDER,
            data: data,
        });
    },

    /**
     * Действие: сбросить корзину
     */
    resetCart() {
        Dispatcher.dispatch({
            actionName: CartActionTypes.RESET_CART,
        });
    },

    /**
     * Действие: сбросить корзину
     */
    mergeCart() {
        Dispatcher.dispatch({
            actionName: CartActionTypes.MERGE_CART,
        });
    },

    /**
     * Действие: применить промокод
     * @param {String} data - строка с промокодом
     */
    applyPromocode(data) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.APPLY_PROMOCODE,
            data: data,
        });
    },
};
