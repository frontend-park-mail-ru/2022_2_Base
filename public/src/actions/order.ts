'use strict';

import Dispatcher from '../modules/dispatcher';

/**
 * Константа, содержащая в себе типы действий в корзине.
 */
export const OrderActionTypes = {
    GET_ORDERS: 'GET_ORDERS',
};

/**
 * Класс, содержащий в себе действия в корзине.
 */
export const orderAction = {
    /**
     * Действие: выбрать все товары в корзине.
     */
    getOrders() {
        Dispatcher.dispatch({
            actionName: OrderActionTypes.GET_ORDERS,
        });
    },
};
