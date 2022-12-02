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
        this.paymentStates.set('paid', 'Оплачен');
        this.paymentStates.set('onReceive', 'При получении');
        this.paymentStates.set('not started', 'Не оплачено');

        this.ordersStates = new Map();
        this.ordersStates.set('cart', 'В корзине');
        this.ordersStates.set('created', 'Создан');
        this.ordersStates.set('processed', 'В обработке');
        this.ordersStates.set('delivery', 'Доставляется');
        this.ordersStates.set('delivered', 'Доставлен');
        this.ordersStates.set('received', 'Получен');
        this.ordersStates.set('returned', 'Возвращен');
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
