'use strict';

import Dispatcher from '../modules/dispatcher.js';

/**
 * Константа, содержащая в себе типы действий в корзине.
 */
export const BasketActionTypes = {
    GET_BASKET: 'GET_BASKET',
    SELECT_ALL: 'SELECT_ALL',
    SELECT_BY_ID: 'SELECT_BY_ID',
    DELETE_BY_ID: 'DELETE_BY_ID',
    INCREASE_NUMBER: 'INCREASE_NUMBER',
    DECREASE_NUMBER: 'DECREASE_NUMBER',
    BUY: 'BUY',
    SAVE_EDIT_DELIVERY: 'SAVE_EDIT_DELIVERY',
};

/**
 * Класс, содержащий в себе действия в корзине.
 */
export const BasketAction = {
    /**
     * Действие: запрос корзины.
     */
    getBasket() {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.GET_BASKET,
        });
    },

    /**
     * Действие: выбрать все товары в корзине.
     */
    selectAllBasket() {
        Dispatcher.dispatch({
            actionName: BasketActionTypes.SELECT_ALL,
        });
    },

    /**
     * Действие: выбрать товар по ID.
     * @param {any} id
     */
    selectById(id) {
        Dispatcher.dispatch({
            actionName: BasketActionTypes.SELECT_BY_ID,
            data: {id},
        });
    },

    /**
     * Действие: удалить товар по ID.
     * @param {any} id
     */
     deleteById(id) {
        Dispatcher.dispatch({
            actionName: BasketActionTypes.DELETE_BY_ID,
            data: {id},
        });
    },

    /**
         * Действие: увеличить количество товара.
         * @param {any} id
         */
    increaseNumber(id) {
        Dispatcher.dispatch({
            actionName: BasketActionTypes.INCREASE_NUMBER,
            data: {id},
        });
    },

    /**
         * Действие: уменьшить количество товара.
         * @param {any} id
         */
    decreaseNumber(id) {
        Dispatcher.dispatch({
            actionName: BasketActionTypes.DECREASE_NUMBER,
            data: {id},
        });
    },

    /**
     * Действие: оформить заказ
     */
    buy() {
        Dispatcher.dispatch({
            actionName: BasketActionTypes.BUY,
        });
    },

    /**
     * Действие: редактировать данные доставки.
     * @param {String} address - адрес
     * @param {String} price - стоимость
     * @param {String} date - дата
     */
    saveEditDelivery(address, price, date) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.SAVE_EDIT_DELIVERY,
            data: {
                address,
                price,
                date
            },
        });
    },
};
