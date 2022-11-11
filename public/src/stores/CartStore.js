import BaseStore from './BaseStore.js';
import {ItemCardsActionTypes} from '../actions/itemCards.js';
import Dispatcher from '../modules/dispatcher.js';
import {cartAction, CartActionTypes} from '../actions/cart.js';
import request from '../modules/ajax.js';
import {config} from '../config.js';
import sharedFunctions from '../modules/sharedFunctions.js';

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
        currID: 'currID',
        itemsCart: 'itemsCart',
    };

    /**
     * @constructor
     */
    constructor() {
        super();
        this._storage = new Map();
        this._storage.set(this._storeNames.responseCode, null);
        this._storage.set(this._storeNames.itemsCart, this.#items);
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
        case CartActionTypes.SELECT_BY_ID:
            await this._selectById(payload.data);
            this._emitChange([CartActionTypes.SELECT_BY_ID]);
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

        case CartActionTypes.BUY:
            await this._buy(payload.data);
            this._emitChange([CartActionTypes.BUY]);
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
            console.log(outD.items);
        } else {
            console.log('error', status);
        }
    }

    /**
     * Действие: выбрать товар по ID.
     * @param {number} id
     */
    async _selectById(id) {

    }

    /**
     * Действие: удалить товар по ID.
     * @param {number} id
     */
    async _deleteById(id) {
        const payload = {};
        const itemsCart = this._storage.get(this._storeNames.itemsCart);
        itemsCart.forEach((item, key) => {
            item.item.price = sharedFunctions._parseInt(item.item.price);
            if (item.item.lowprice) {
                item.item.lowprice = sharedFunctions._parseInt(item.item.lowprice);
            }
            if (item.item.id === id) {
                delete itemsCart[key];
                payload.itemid = id
            }
        });
        const [status] = await request.makePostRequest(config.api.deletefromcart, payload)
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
        const payload = {};
        const flag = true;
        const itemsCart = this._storage.get(this._storeNames.itemsCart);
        for (const item of itemsCart) {
            payload.itemid = item.item.id;
            const [status] = await request.makePostRequest(config.api.deletefromcart, payload)
                .catch((err) => console.log(err));
            if (status === 200 || true) {
            } else {
                flag = false;
                console.log('error', status);
            }
        };
        if (flag === true) {
            this._storage.set(this._storeNames.responseCode, 200);
            this._storage.set(this._storeNames.itemsCart, []);
        } else {
            console.log('error when emptying cart');
        }
    }

    /**
     * Действие: увеличить количество товара.
     * @param {number} id
     */
    async _increaseNumber(id) {
        // const [status] = await request.makePostRequest(config.api.insertIntoCart, id)
        //    .catch((err) => console.log(err));
        this._storage.set(id, 1);
        this._storage.set(this._storeNames.currID, id);
        this._storage.set(this._storeNames.responseCode, status);
    }

    /**
     * Действие: увеличить количество товара.
     * @param {number} id
     */
    async _addToCart(id) {
        // const [status] = await request.makePostRequest(config.api.insertIntoCart, id)
        //    .catch((err) => console.log(err));
        this._storage.set(id, this._storage.get('item' + id) + 1);
        this._storage.set(this._storeNames.currID, id);
        this._storage.set(this._storeNames.responseCode, status);
    }

    /**
     * Действие: уменьшить количество товара.
     * @param {number} id
     */
    async _decreaseNumber(id) {
        // const [status] = await request.makePostRequest(config.api.deletefromcart, id)
        //    .catch((err) => console.log(err));
        this._storage.set(id, this._storage.get('item' + id) - 1);
        this._storage.set(this._storeNames.currID, id);
        this._storage.set(this._storeNames.responseCode, status);
    }

    /**
     * Действие: оформить заказ
     */
    _buy() {

    }
}

export default new CartStore();
