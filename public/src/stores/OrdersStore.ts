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
        cancelElementID: 'cancelElementID',
    };

    /**
     * constructor
     */
    constructor() {
        super();
        this._storage = new Map();
        this._storage.set(this._storeNames.orders, []);
        this._storage.set(this._storeNames.responseCode, null);
        this._storage.set(this._storeNames.cancelElementID, 0);

        this.paymentStates = new Map();
        this.paymentStates.set('paid', 'Оплачен');
        this.paymentStates.set('onReceive', 'При получении');
        this.paymentStates.set('not started', 'Не оплачено');

        this.ordersStates = new Map();
        this.ordersStates.set('cart', 'в корзине');
        this.ordersStates.set('created', 'создан');
        this.ordersStates.set('processed', 'в обработке');
        this.ordersStates.set('delivery', 'доставляется');
        this.ordersStates.set('delivered', 'доставлен');
        this.ordersStates.set('received', 'получен');
        this.ordersStates.set('returned', 'возвращен');
        this.ordersStates.set('canceled', 'отменен');
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

        case OrderActionTypes.CANCEL_ORDER:
            await this._cancelOrder(payload.data);
            this._emitChange([OrderActionTypes.CANCEL_ORDER]);
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
                    return (price + (itemCard.lowprice ?? 0) * itemCard.count);
                }, 0));

            item.deliveryDateString = getLocalDate(new Date(item.deliverydate));
            const deliveryDigitTime = new Date(item.deliverydate).getUTCHours();
            item.deliveryTimeString =
                `${deliveryDigitTime - 2}:00 — ${deliveryDigitTime + 2}:00`;

            item.creationDateString = getLocalDate(new Date(item.creationdate));

            item.orderstatus = this.ordersStates.get(item.orderstatus) ?? 'Нет';
            item.paymentstatus = this.paymentStates.get(item.paymentstatus) ?? 'Нет';
            item.cancelled = (item.orderstatus === 'отменен');
        });
        console.log(orders);
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
            if (response.body && response.body.length) {
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

    /**
     * Действие: отменяет заказ.
     * @param id - идентификатор заказа для удаления
     */
    async _cancelOrder(id: number) {
        const [status] = await request
            .makePostRequest(config.api.changeOrderStatus, {
                orderid: id,
                orderstatus: 'canceled',
            })
            .catch((err) => console.log(err)) ?? [];
        this._storage.set(this._storeNames.responseCode, status);
        this._storage.set(this._storeNames.cancelElementID, id);
    }
}

export default new OrdersStore();
