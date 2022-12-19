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
    SINGLE_ADD_TO_CART: 'SINGLE_ADD_TO_CART',
    SINGLE_INCREASE_NUMBER: 'SINGLE_INCREASE_NUMBER',
    SINGLE_DECREASE_NUMBER: 'SINGLE_DECREASE_NUMBER',
    RESET_CART: 'RESET_CART',
    MERGE_CART: 'MERGE_CART',
    APPLY_PROMOCODE: 'APPLY_PROMOCODE',
    CANCEL_PROMOCODE: 'CANCEL_PROMOCODE',
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
     * @param id - идентификатор
     */
    deleteById(id: number) {
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
     * @param id - идентификатор
     */
    increaseNumber(id: number) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.INCREASE_NUMBER,
            data: id,
        });
    },

    /**
     * Действие: уменьшить количество товара.
     * @param id - идентификатор
     */
    decreaseNumber(id: number) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.DECREASE_NUMBER,
            data: id,
        });
    },

    /**
     * Действие: увеличить количество товара.
     * @param id - идентификатор
     */
    addToCart(id: number) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.ADD_TO_CART,
            data: id,
        });
    },

    /**
     * Действие: увеличить количество товара.
     * @param id - идентификатор
     */
    singleIncreaseNumber(id: number) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.SINGLE_INCREASE_NUMBER,
            data: id,
        });
    },

    /**
     * Действие: уменьшить количество товара.
     * @param id - идентификатор
     */
    singleDecreaseNumber(id: number) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.SINGLE_DECREASE_NUMBER,
            data: id,
        });
    },

    /**
     * Действие: увеличить количество товара.
     * @param id - идентификатор
     */
    singleAddToCart(id: number) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.SINGLE_ADD_TO_CART,
            data: id,
        });
    },

    /**
     * Действие: оформить заказ
     * @param data - данные для обработки
     */
    makeOrder(data: object) {
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
     * @param data - строка с промокодом
     */
    applyPromocode(data: string) {
        Dispatcher.dispatch({
            actionName: CartActionTypes.APPLY_PROMOCODE,
            data: data,
        });
    },

    /**
     * Действие: отменить промокод
     */
    cancelPromocode() {
        Dispatcher.dispatch({
            actionName: CartActionTypes.CANCEL_PROMOCODE,
        });
    },
};
