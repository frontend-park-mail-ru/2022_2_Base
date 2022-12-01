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
        this._storage.set(this._storeNames.responseCode, 200); // fix 200 => status
        console.log(response); // fix убрать
        if (status === config.responseCodes.code200 || true) { // fix
            // if (response.body.length || true) { // fix
            if (true) {
            // const orders = response.body.reverse(); // fix

                const orders = [{
                    'id': 1,
                    'userid': 1,
                    'items': [{
                        'id': 3,
                        'name': 'realme GT Master',
                        'count': 1,
                        'price': 29999,
                        'lowprice': 21999,
                        'imgsrc': 'https://img.mvideo.ru/Big/30058843bb.jpg',
                    }, {
                        'id': 4,
                        'name': 'Apple iPhone 11',
                        'count': 1,
                        'price': 62999,
                        'lowprice': 54999,
                        'imgsrc': 'https://img.mvideo.ru/Big/30063237bb.jpg',
                    },
                    {
                        'id': 4,
                        'name': 'Apple iPhone 11',
                        'count': 1,
                        'price': 62999,
                        'lowprice': 54999,
                        'imgsrc': 'https://img.mvideo.ru/Big/30063237bb.jpg',
                    },
                    {
                        'id': 4,
                        'name': 'Apple iPhone 11',
                        'count': 1,
                        'price': 62999,
                        'lowprice': 54999,
                        'imgsrc': 'https://img.mvideo.ru/Big/30063237bb.jpg',
                    }],
                    'orderstatus': 'created',
                    'paymentstatus': 'not started',
                    'address': {
                        'id': 1,
                        'city': 'default',
                        'street': 'default',
                        'house': 'default',
                        'flat': '',
                        'priority': false,
                    },
                    'card': {
                        'id': 1,
                        'type': 'Card',
                        'number': 'default',
                        'expirydate': '1975-08-19T00:00:00Z',
                        'priority': false,
                    },
                    'creationDate': '2022-11-28T15:40:26Z',
                    'deliveryDate': '2022-12-01T10:00:00Z',
                }, {
                    'id': 3,
                    'userid': 1,
                    'items': [{
                        'id': 2,
                        'name': 'Tecno Spark 8с',
                        'count': 1,
                        'price': 12999,
                        'lowprice': 8999,
                        'imgsrc': 'https://img.mvideo.ru/Big/30062036bb.jpg',
                    }, {
                        'id': 3,
                        'name': 'realme GT Master',
                        'count': 1,
                        'price': 29999,
                        'lowprice': 21999,
                        'imgsrc': 'https://img.mvideo.ru/Big/30058843bb.jpg',
                    }],
                    'orderstatus': 'created',
                    'paymentstatus': 'not started',
                    'address': {
                        'id': 1,
                        'city': 'default',
                        'street': 'default',
                        'house': 'default',
                        'flat': '',
                        'priority': false,
                    },
                    'card': {
                        'id': 1,
                        'type': 'Card',
                        'number': 'default',
                        'expirydate': '1975-08-19T00:00:00Z',
                        'priority': false,
                    },
                    'creationDate': '2022-11-28T23:26:23Z',
                    'deliveryDate': '2023-01-01T10:00:00Z',
                }];


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
