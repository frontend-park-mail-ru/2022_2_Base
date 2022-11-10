import BaseStore from './BaseStore.js';
import {ItemCardsActionTypes} from '../actions/itemCards';
import Dispatcher from '../modules/dispatcher';
import {basketAction, BasketActionTypes} from '../actions/basket';
import request from '../modules/ajax';
import {config} from '../config.js';

/**
 * Класс, реализующий базовое хранилище.
 */
class CartStore extends BaseStore {
    _storeNames = {
        responseCode: 'responseCode',
        currID: 'currID',
    };

    /**
     * @constructor
     */
    constructor() {
        super();
        this._storage = new Map();
        this._storage.set(this._storeNames.responseCode, null);
    }

    /**
     * Метод, реализующий реакцию на рассылку Диспетчера.
     * @param {Object} payload полезная нагрузка запроса
     */
    async _onDispatch(payload) {
        switch (payload.actionName) {
        case BasketActionTypes.SELECT_ALL:
            await this._selectAllBasket();
            this._emitChange([BasketActionTypes.SELECT_ALL]);
            break;
        case BasketActionTypes.SELECT_BY_ID:
            await this._selectById(payload.data);
            this._emitChange([BasketActionTypes.SELECT_BY_ID]);
            break;
        case BasketActionTypes.DELETE_BY_ID:
            await this._deleteById(payload.data);
            this._emitChange([BasketActionTypes.DELETE_BY_ID]);
            break;
        case BasketActionTypes.DELETE_ALL:
            await this._deleteAll(payload.data);
            this._emitChange([BasketActionTypes.DELETE_ALL]);
            break;
        case BasketActionTypes.INCREASE_NUMBER:
            await this._increaseNumber(payload.data);
            this._emitChange([BasketActionTypes.INCREASE_NUMBER]);
            break;

        case BasketActionTypes.ADD_TO_CART:
            await this._addToCart(payload.data);
            this._emitChange([BasketActionTypes.ADD_TO_CART]);
            break;

        case BasketActionTypes.DECREASE_NUMBER:
            await this._decreaseNumber(payload.data);
            this._emitChange([BasketActionTypes.DECREASE_NUMBER]);
            break;

        case BasketActionTypes.BUY:
            await this._buy(payload.data);
            this._emitChange([BasketActionTypes.BUY]);
            break;
        }
    }

    /**
     * Действие: выбрать товар по ID.
     */
    async _selectAllBasket() {

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

    }

    /**
     * Действие: удалить товар по ID.
     */
    async _deleteAll() {

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
        // const [status] = await request.makePostRequest(config.api.deleteFromCart, id)
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
