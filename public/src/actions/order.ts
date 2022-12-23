'use strict';

import Dispatcher from '../modules/dispatcher';

/**
 * Константа, содержащая в себе типы действий в корзине.
 */
export const OrderActionTypes = {
    GET_ORDERS: 'GET_ORDERS',
    CANCEL_ORDER: 'CANCEL_ORDER',
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

    /**
     * Действие: отменяет заказ.
     * @param id - идентификатор заказа для удаления
     */
    cancelOrder(id: number) {
        Dispatcher.dispatch({
            actionName: OrderActionTypes.GET_ORDERS,
            data: id,
        });
    },
};
