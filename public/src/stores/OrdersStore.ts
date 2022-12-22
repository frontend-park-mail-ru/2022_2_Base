import BaseStore from './BaseStore';
import request from '../modules/ajax';
import {config} from '../config';
import {OrderActionTypes} from '../actions/order';
import {_addSpacesToItemPrice, getLocalDate, truncatePrice} from '../modules/sharedFunctions';

/**
 * Класс, реализующий базовое хранилище.
 */
class OrdersStore extends BaseStore {
    ordersStates: Map<string, string>;
    paymentStates: Map<string, string>;
    _storeNames = {
        orders: 'orders',
        responseCode: 'responseCode',
    };

    /**
     * constructor
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
     * @param payload - полезная нагрузка запроса
     */
    override async _onDispatch(payload: dispatcherPayload) {
        switch (payload.actionName) {
        case OrderActionTypes.GET_ORDERS:
            await this._getOrders();
            this._emitChange([OrderActionTypes.GET_ORDERS]);
            break;
        }
    }

    /**
     * Метод, дополняющий информацию о заказах.
     * @param orders - полезная нагрузка запроса
     */
    #prepareOrdersData(orders: Array<itemOrderData>) {
        orders.forEach((item: itemOrderData) => {
            item.totalPrice = truncatePrice(item.items.reduce(
                (price: number, itemCard: priceData) => {
                    _addSpacesToItemPrice(itemCard);
                    return (price + (itemCard.lowprice ?? 0));
                }, 0));

            item.deliveryDateString = getLocalDate(new Date(item.deliveryDate));
            const deliveryDigitTime = new Date(item.deliveryDate).getHours();
            item.deliveryTimeString =
                `${deliveryDigitTime - 2}:00 — ${deliveryDigitTime + 2}:00`;

            item.creationDateString = getLocalDate(new Date(item.creationDate));

            item.orderstatus = this.ordersStates.get(item.orderstatus) ?? 'Нет';
            item.paymentstatus = this.paymentStates.get(item.paymentstatus) ?? 'Нет';
        });
    }

    /**
     * Действие: запрос списка карточек.
     */
    async _getOrders() {
        const [status, response] = await request
            .makeGetRequest(config.api.orders)
            .catch((err) => console.log(err)) ?? [];
        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            if (response.body.length) {
                const orders = response.body.reverse() ?? [];
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
