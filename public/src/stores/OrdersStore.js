import BaseStore from './BaseStore.js';
import request from '../modules/ajax';
import {config} from '../config.js';
import {OrderActionTypes} from '../actions/order';
import {_addSpacesToItemPrice, getLocalDate, truncatePrice} from '../modules/sharedFunctions';

/**
 * Класс, реализующий базовое хранилище.
 */
class OrdersStore extends BaseStore {
    _storeNames = {
        orders: 'orders',
        responseCode: 'responseCode',
    };

    /**
     * @constructor
     */
    constructor() {
        super();
        this._storage = new Map();
        this._storage.set(this._storeNames.orders, []);
        this._storage.set(this._storeNames.responseCode, null);

        this.paymentStates = new Map();
        this.paymentStates.set('paid', 'оплачен');
        this.paymentStates.set('onReceive', 'при получении');
        this.paymentStates.set('not started', 'не оплачено');

        this.ordersStates = new Map();
        this.ordersStates.set('cart', 'в корзине');
        this.ordersStates.set('created', 'cоздан');
        this.ordersStates.set('processed', 'в обработке');
        this.ordersStates.set('delivery', 'доставляется');
        this.ordersStates.set('delivered', 'доставлен');
        this.ordersStates.set('received', 'получен');
        this.ordersStates.set('returned', 'возвращен');
    }

    /**
     * Метод, реализующий реакцию на рассылку Диспетчера.
     * @param {Object} payload полезная нагрузка запроса
     */
    async _onDispatch(payload) {
        switch (payload.actionName) {
        case OrderActionTypes.GET_ORDERS:
            await this._getOrders();
            this._emitChange([OrderActionTypes.GET_ORDERS]);
            break;
        }
    }

    /**
     * Метод, дополняющий информацию о заказах.
     * @param {Array} orders полезная нагрузка запроса
     */
    #prepareOrdersData(orders) {
        orders.forEach((item) => {
            item.totalPrice = item.items.reduce((price, itemCard) => {
                _addSpacesToItemPrice(itemCard);
                return price + itemCard.lowprice;
            }, 0);
            item.totalPrice = truncatePrice(item.totalPrice);

            item.deliveryDateString = getLocalDate(new Date(item.deliveryDate));
            item.deliveryTimeString = new Date(item.deliveryDate).getHours();
            item.deliveryTimeString =
                `${item.deliveryTimeString - 2}:00 — ${item.deliveryTimeString + 2}:00`;

            item.creationDateString = getLocalDate(new Date(item.creationDate));

            item.orderstatus = this.ordersStates.get(item.orderstatus);
            item.paymentstatus = this.paymentStates.get(item.paymentstatus);
        });
    }

    /**
     * Действие: запрос списка карточек.
     */
    async _getOrders() {
        const [status, response] = await request
            .makeGetRequest(config.api.orders)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);

        if (status === config.responseCodes.code200) {
            if (response.body.length) {
                const orders = response.body.reverse();
                this.#prepareOrdersData(orders);
                this._storage.set(this._storeNames.orders, orders);
            } else {
                this._storage.set(this._storeNames.orders, []);
            }
        } else {
            this._storage.set(this._storeNames.orders, []);
        }
    }
}

export default new OrdersStore();
