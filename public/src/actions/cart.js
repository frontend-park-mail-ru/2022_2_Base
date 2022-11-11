'use strict';

import Dispatcher from '../modules/dispatcher.js';

/**
 * Константа, содержащая в себе типы действий в корзине.
 */
export const CartActionTypes = {
    GET_CART: 'GET_CART',
    SELECT_ALL: 'SELECT_ALL',
    SELECT_BY_ID: 'SELECT_BY_ID',
    DELETE_BY_ID: 'DELETE_BY_ID',
    DELETE_ALL: 'DELETE_ALL',
    INCREASE_NUMBER: 'INCREASE_NUMBER',
    DECREASE_NUMBER: 'DECREASE_NUMBER',
    BUY: 'BUY',
    SAVE_EDIT_DELIVERY: 'SAVE_EDIT_DELIVERY',
    ADD_TO_CART: 'ADD_TO_CART',
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
     * Действие: выбрать товар по ID.
     * @param {number} id
     */
    selectById(id) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.SELECT_BY_ID,
            data: id,
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
     * Действие: оформить заказ
     */
    buy() {
        Dispatcher.dispatch({
            actionName: CartActionTypes.BUY,
        });
    },
};
