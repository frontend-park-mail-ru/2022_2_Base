import BaseStore from './BaseStore';
import {CartActionTypes} from '../actions/cart';
import request from '../modules/ajax';
import {config} from '../config';
import userStore from './UserStore';
import itemsStore from './ItemsStore';
import {addSpacesToPrice} from '../modules/sharedFunctions';

/**
 * Класс, реализующий базовое хранилище.
 */
class CartStore extends BaseStore {
    _storeNames = {
        responseCode: 'responseCode',
        itemsCart: 'itemsCart',
        cartID: 'cartID',
        userID: 'userID',
        currID: 'currID',
    };

    /**
     * @constructor
     */
    constructor() {
        super();
        this._storage = new Map();
        this._storage.set(this._storeNames.responseCode, null);
        this._storage.set(this._storeNames.itemsCart, []);
        this._storage.set(this._storeNames.cartID, null);
        this._storage.set(this._storeNames.userID, null);
        this._storage.set(this._storeNames.currID, null);
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

        case CartActionTypes.MAKE_ORDER:
            await this._makeOrder(payload.data);
            this._emitChange([CartActionTypes.MAKE_ORDER]);
            break;

        case CartActionTypes.RESET_CART:
            await this._resetCart();
            break;

        case CartActionTypes.MERGE_CART:
            await this._mergeCart();
            this._emitChange([CartActionTypes.MERGE_CART]);
            break;
        }
    }

    /**
     * Действие: сбросить корзину.
     */
    async _resetCart() {
        this._storage.set(this._storeNames.itemsCart, []);
        this._storage.set(this._storeNames.cartID, null);
        this._storage.set(this._storeNames.userID, null);
    }

    /**
     * Действие: соединить локальную корзину с корзиной в БД.
     */
    async _mergeCart() {
        const [status, response] = await request.makeGetRequest(config.api.cart)
            .catch((err) => console.log(err));

        const itemsCart = this._storage.get(this._storeNames.itemsCart);
        response?.items?.forEach((globalItem) => {
            let hasItem = false;
            itemsCart?.forEach((localItem, key) => {
                if (globalItem.id === localItem.id) {
                    itemsCart[key].count += globalItem.count;
                    hasItem = true;
                }
            });
            if (!hasItem) {
                itemsCart.push(globalItem);
            }
        });
        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames.cartID, response.id);
            this._storage.set(this._storeNames.userID, response.userid);
            this._storage.set(this._storeNames.itemsCart, response.items ?? []);
            const [postStatus] = await request.makePostRequest(config.api.cart, {
                items: itemsCart.map(({id}) => id),
            }).catch((err) => console.log(err));
            this._storage.set(this._storeNames.responseCode, postStatus);
            if (postStatus === config.responseCodes.code200) {
                this._storage.set(this._storeNames.itemsCart, itemsCart);
            }
        }
    }

    /**
     * Действие: получить данные корзины.
     */
    async _getCart() {
        const [status, response] = await request.makeGetRequest(config.api.cart)
            .catch((err) => console.log(err));

        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            addSpacesToPrice(response.items);
            this._storage.set(this._storeNames.itemsCart, response.items ?? []);
            this._storage.set(this._storeNames.cartID, response.id);
            this._storage.set(this._storeNames.userID, response.userid);
        }
    }

    /**
     * Действие: удалить товар по ID.
     * @param {number} id
     */
    async _deleteById(id) {
        const noNullItemsCart =
            this._storage.get(this._storeNames.itemsCart)
                .filter((item) => item.id !== id)
                .map((item) => item.id);
        const [status] = await request.makePostRequest(config.api.cart, {items: noNullItemsCart})
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        console.log('noNullItemsCart', noNullItemsCart);// fix
        this._storage.set(this._storeNames.itemsCart, noNullItemsCart);
    }

    /**
     * Действие: удалить все товары из корзины.
     */
    async _deleteAll() {
        const [status] = await request.makePostRequest(config.api.cart, {
            items: [],
        })
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        this._storage.set(this._storeNames.itemsCart, []);
    }

    /**
     * Действие: добавить товар в корзину.
     * @param {number} status
     * @param {number} countChange
     * @param {number} id
     */
    #editCountOfItem(status, countChange, id) {
        if (userStore.getContext(userStore._storeNames.isAuth)) {
            this._storage.set(this._storeNames.responseCode, status);
        }
        this._storage.set(this._storeNames.currID, id);
        const itemToAdd = itemsStore.getContext(itemsStore._storeNames.allCardsInCategory).find(
            (item) => item.id === Number(id));
        if (itemToAdd) {
            itemToAdd.count = countChange + (itemToAdd?.count ?? 0);
        }
        const currCartItems = this._storage.get(this._storeNames.itemsCart);
        console.log('currCartItems', currCartItems);// fix
        const editItemIndex = currCartItems.findIndex((item) => item.id === itemToAdd.id);
        if (editItemIndex === -1) {
            currCartItems.push(itemToAdd);
        } else {
            currCartItems[editItemIndex] = itemToAdd;
        }
        console.log('currCartItems 2', currCartItems);// fix
        this._storage.set(this._storeNames.itemsCart, currCartItems);
    }

    /**
     * Действие: добавить товар в корзину.
     * @param {number} id
     */
    async _addToCart(id) {
        let status;
        if (userStore.getContext(userStore._storeNames.isAuth)) {
            [status] = await request.makePostRequest(config.api.insertIntoCart, {
                itemid: Number(id),
            }).catch((err) => console.log(err));
        }
        this.#editCountOfItem(status,
            1, id);
    }

    /**
     * Действие: увеличить количество товара.
     * @param {number} id
     */
    async _increaseNumber(id) {
        await this._addToCart(id);
    }

    /**
     * Действие: уменьшить количество товара.
     * @param {number} id
     */
    async _decreaseNumber(id) {
        let status;
        if (userStore.getContext(userStore._storeNames.isAuth)) {
            [status] = await request.makePostRequest(config.api.deleteFromCart, {
                itemid: Number(id),
            })
                .catch((err) => console.log(err));
        }
        await this.#editCountOfItem(status,
            -1, id);
    }

    /**
     * Действие: оформить заказ
     * @param {object} data - данные для оформления заказа
     */
    async _makeOrder(data) {
        data.userid = this._storage.get(this._storeNames.userID);
        // data.card = this._storage.get(this._storeNames.cartID);
        const [status] = await request.makePostRequest(config.api.makeOrder, data)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            // const itemsCart = this._storage.get(this._storeNames.itemsCart);
            // data.items.forEach((id) => {
            //     itemsCart.forEach((item, key) => {
            //         if (item.id === id) {
            //             delete itemsCart[key];
            //         }
            //     });
            // });

            this._storage.set(this._storeNames.itemsCart, data.items.reduce(
                (newItemsCart, id) =>
                    newItemsCart.filter((item) => item.id !== id),
                this._storage.get(this._storeNames.itemsCart)));
        }
    }
}

export default new CartStore();
