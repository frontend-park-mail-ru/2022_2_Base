import BaseStore from './BaseStore.js';
import {ItemCardsActionTypes} from '../actions/itemCards';
import request from '../modules/ajax';
import {config} from '../config.js';
import cartStore from './CartStore';
import sharedFunctions from '../modules/sharedFunctions';
import {OrderActionTypes} from '../actions/order';

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
     * Действие: запрос списка карточек.
     */
    async _getOrders() {
        const [status, response] = await request
            .makeGetRequest(config.api.orders)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);

        // example response
        // [
        // {
        //     "address": 0,
        //     "card": 0,
        //     "creationDate": "string",
        //     "deliveryDate": "string",
        //     "id": 0,
        //     "items": [
        //     {
        //         "count": 0,
        //         "item": {
        //             "category": "string",
        //             "id": 0,
        //             "imgsrc": "string",
        //             "lowprice": 0,
        //             "name": "string",
        //             "price": 0,
        //             "rating": 0
        //         }
        //     }
        // ],
        //     "orderstatus": "string",
        //     "paymentstatus": "string",
        //     "userid": 0
        // }
        // ]

        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames.orders, response);
        }
    }
}

export default new OrdersStore();
