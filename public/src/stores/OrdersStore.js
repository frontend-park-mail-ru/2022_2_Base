import BaseStore from './BaseStore.js';
import request from '../modules/ajax';
import {config} from '../config.js';
// import sharedFunctions from '../modules/sharedFunctions';
import {OrderActionTypes} from '../actions/order';
import userStore from './UserStore';

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
     * Метод, дополняющий информацию о заказах.
     * @param {Array} orders полезная нагрузка запроса
     */
    #prepareOrdersData(orders) {
        orders.forEach((element) => {
            let price = 0;
            let addressString;

            element.items.forEach((itemcard) => {
                price += (itemcard.item.lowprice > 0 ? itemcard.item.lowprice : itemcard.item.price);
            });

            element.totalPrice = price;

            const address = userStore.getContext(userStore._storeNames.address);
            if (address) {
                address.forEach((key) => {
                    if (key.id === element.address) {
                        addressString = `${key.city}, ${key.street}, д. ${key.house}, кв. ${key.flat}`;
                    }
                });
                element.addressString = addressString;
            }

            const [deliveryDate, deliveryTime] = element.deliveryDate.split('T');

            const deliveryDateSpit = deliveryDate.split('-');
            const deliveryDateString =
                `${deliveryDateSpit[2]} / ${deliveryDateSpit[1]} / ${deliveryDateSpit[0]}`;

            const deliveryTimeHour = parseInt(deliveryTime.split('.')[0].split(':')[0]);


            element.deliveryDateString = deliveryDateString;
            element.deliveryTimeString = `${deliveryTimeHour - 2}:00 - ${deliveryTimeHour + 2}:00`;

            const creationDate = element.creationDate.split('T')[0];
            const creationDateSpit = creationDate.split('-');
            element.creationDateString =
                `${creationDateSpit[2]} / ${creationDateSpit[1]} / ${creationDateSpit[0]}`;
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
            let orders = response.body;

            // тестовые данные
            /*
            orders = [
                {
                    address: 1,
                    card: 0,
                    creationDate: '2022-11-28T08:00:00.000Z',
                    deliveryDate: '2022-11-28T10:00:00.000Z',
                    id: 1,
                    items: [
                        {
                            count: 1,
                            item: {
                                category: 'string',
                                id: 123,
                                imgsrc: './../img/Smartphone.webp',
                                lowprice: 0,
                                name: 'iPhone 11 Pro 64Гб',
                                price: 24990,
                                rating: 0,
                            },
                        },
                        {
                            count: 5,
                            item: {
                                category: 'string',
                                id: 124,
                                imgsrc: './../img/Smartphone.webp',
                                lowprice: 22990,
                                name: 'iPhone 11 Pro 64Гб',
                                price: 30990,
                                rating: 0,
                            },
                        },
                        {
                            count: 5,
                            item: {
                                category: 'string',
                                id: 124,
                                imgsrc: './../img/Smartphone.webp',
                                lowprice: 22990,
                                name: 'iPhone 11 Pro 64Гб',
                                price: 30990,
                                rating: 0,
                            },
                        },
                    ],
                    orderStatus: 'Статус?',
                    paymentStatus: 'Статус оплаты?',
                    userId: 0,
                },
                {
                    address: 2,
                    card: 0,
                    creationDate: '2022-11-28T08:00:00.000Z',
                    deliveryDate: '2022-11-28T14:00:00.000Z',
                    id: 2,
                    items: [
                        {
                            count: 1,
                            item: {
                                category: 'string',
                                id: 123,
                                imgsrc: './../img/Smartphone.webp',
                                lowprice: 0,
                                name: 'iPhone 11 Pro 64Гб',
                                price: 24990,
                                rating: 0,
                            },
                        },
                        {
                            count: 5,
                            item: {
                                category: 'string',
                                id: 124,
                                imgsrc: './../img/Smartphone.webp',
                                lowprice: 22990,
                                name: 'iPhone 11 Pro 64Гб',
                                price: 30990,
                                rating: 0,
                            },
                        },
                    ],
                    orderStatus: 'Статус?',
                    paymentStatus: 'Статус оплаты?',
                    userId: 0,
                },
            ];
            */

            this.#prepareOrdersData(orders);
            orders = orders.reverse();
            this._storage.set(this._storeNames.orders, orders);
        }
    }
}

export default new OrdersStore();
