import BaseStore from './BaseStore.js';
import {CartActionTypes} from '../actions/cart.js';
import request from '../modules/ajax.js';
import {config} from '../config.js';

/**
 * Класс, реализующий базовое хранилище.
 */
class CartStore extends BaseStore {
    #items = [
        {
            count: 1,
            item: {
                name: `Apple iPhone 13 64 ГБ \\r
                gladwehaveanunderstanding, fuck out the way
    yeah, all your shit lame, I feel no pain, we" "\\eof`,
                imgsrc: './img/Smartphone.png',
                category: '',
                price: 100000,
                lowprice: null,
                id: 1,
                rating: 5,
            },
        },
        {
            count: 2,
            item: {
                name: `Apple iPhone 13 64 ГБ \\r
                gladwehaveanunderstanding, fuck out the way
    yeah, all your shit lame, I feel no pain, we" "\\eof`,
                imgsrc: './img/Smartphone.png',
                category: '',
                price: 100000,
                lowprice: 80000,
                id: 12,
                rating: 10,
            },
        },
    ];
    _storeNames = {
        responseCode: 'responseCode',
        itemsCart: 'itemsCart',
        address: 'address',
        userid: 'userid',
    };

    /**
     * @constructor
     */
    constructor() {
        super();
        this._storage = new Map();
        this._storage.set(this._storeNames.responseCode, null);
        this._storage.set(this._storeNames.itemsCart, this.#items);
        this._storage.set(this._storeNames.address, null);
        this._storage.set(this._storeNames.userid, null);
    }

    /**
     * Метод, реализующий реакцию на рассылку Диспетчера.
     * @param {Object} payload полезная нагрузка запроса
     */
    async _onDispatch(payload) {
        switch (payload.actionName) {
        case CartActionTypes.GET_CART:
            await this._getCart();
            this._emitChange([CartActionTypes.GET_CART]);
            break;
        case CartActionTypes.DELETE_BY_ID:
            await this._deleteById(payload.data);
            this._emitChange([CartActionTypes.DELETE_BY_ID]);
            break;
        case CartActionTypes.DELETE_ALL:
            await this._deleteAll(payload.data);
            this._emitChange([CartActionTypes.DELETE_ALL]);
            break;

        case CartActionTypes.INCREASE_NUMBER:
            await this._increaseNumber(payload.data);
            this._emitChange([CartActionTypes.INCREASE_NUMBER]);
            break;

        case CartActionTypes.ADD_TO_CART:
            await this._addToCart(payload.data);
            this._emitChange([CartActionTypes.ADD_TO_CART]);
            break;

        case CartActionTypes.DECREASE_NUMBER:
            await this._decreaseNumber(payload.data);
            this._emitChange([CartActionTypes.DECREASE_NUMBER]);
            break;

        case CartActionTypes.MAKEORDER:
            await this._makeOrder(payload.data);
            this._emitChange([CartActionTypes.MAKEORDER]);
            break;
        }
    }

    /**
     * Действие: получить данные корзины.
     */
    async _getCart() {
        const [status, outD] = await request.makeGetRequest(config.api.cart)
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200) {
            this._storage.set(this._storeNames.itemsCart, outD.items);
            this._storage.set(this._storeNames.address, outD.adress);
            this._storage.set(this._storeNames.userid, outD.userid);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Действие: удалить товар по ID.
     * @param {number} id
     */
    async _deleteById(id) {
        const payload = {
            items: [],
        };
        const itemsCart = this._storage.get(this._storeNames.itemsCart);
        itemsCart.forEach((item, key) => {
            if (item.item.id === id) {
                delete itemsCart[key];
            } else {
                payload.items.push(item.item.id);
            }
        });
        const [status] = await request.makePostRequest(config.api.cart, payload)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200 || true) {
            this._storage.set(this._storeNames.itemsCart, itemsCart);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Действие: удалить все товары из корзины.
     */
    async _deleteAll() {
        const payload = {
            items: [],
        };
        const [status] = await request.makePostRequest(config.api.cart, payload)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200 || true) {
            this._storage.set(this._storeNames.itemsCart, payload.items);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Действие: увеличить количество товара.
     * @param {number} id
     */
    async _increaseNumber(id) {
        const itemsCart = this._storage.get(this._storeNames.itemsCart);
        itemsCart.forEach((item, key) => {
            if (item.item.id === id) {
                itemsCart[key].count = itemsCart[key].count + 1;
            }
        });
        const [status] = await request.makePostRequest(config.api.insertIntoCart, {
            itemid: idlet,
        })
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200 || true) {
            this._storage.set(this._storeNames.itemsCart, itemsCart);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Действие: добавить товар в корзину.
     * @param {number} id
     */
    async _addToCart(id) {
        const [status] = await request.makePostRequest(config.api.insertIntoCart, id)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200 || true) {
            console.log('Adding to the cart was successful');
        } else {
            console.log('error', status);
        }
    }

    /**
     * Действие: уменьшить количество товара.
     * @param {number} id
     */
    async _decreaseNumber(id) {
        const itemsCart = this._storage.get(this._storeNames.itemsCart);
        itemsCart.forEach((item, key) => {
            if (item.item.id === id) {
                itemsCart[key].count = itemsCart[key].count - 1;
            }
        });
        const [status] = await request.makePostRequest(config.api.deleteFromCart, {
            itemid: id,
        })
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200 || true) {
            this._storage.set(this._storeNames.itemsCart, itemsCart);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Действие: оформить заказ
     * @param {object} date - данные для оформления заказа
     */
    async _makeOrder(date) {
        const itemsCart = this._storage.get(this._storeNames.itemsCart);
        date.items.forEach((id) => {
            itemsCart.forEach((item, key) => {
                if (item.item.id === id) {
                    delete itemsCart[key];
                }
            });
        });
        const [status] = await request.makePostRequest(config.api.makeOrder, date)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === 200 || true) {
            this._storage.set(this._storeNames.itemsCart, itemsCart);
            console.log('Order created');
        } else {
            console.log('error', status);
        }
    }

    /**
     * Функция, возвращающая завтрашнюю дату.
     * @param {int} firstDayIn сколько дней пропустить, считая от сегодняшнего
     * @return {object} завтрашняя дата
     */
    #getDate(firstDayIn) {
        const getDate = (next) => {
            const currDate = new Date(new Date().getTime() + next * 24 * 60 * 60 * 1000);
            return `${currDate.getDate()} / ${currDate.getMonth()} / ${currDate.getFullYear()}`;
        };
        return Array.from(Array(7).keys()).map((inDays) => getDate(inDays + firstDayIn));
    }
}

export default new CartStore();
