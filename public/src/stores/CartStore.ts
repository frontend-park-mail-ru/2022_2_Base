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
    override _storage: Map<string, any>;
    _storeNames = {
        responseCode: 'responseCode',
        itemsCart: 'itemsCart',
        cartID: 'cartID',
        userID: 'userID',
        currID: 'currID',
        promocode: 'promocode',
    };

    /**
     * constructor
     */
    constructor() {
        super();
        this._storage = new Map();
        this._storage.set(this._storeNames.responseCode, null);
        this._storage.set(this._storeNames.itemsCart, []);
        this._storage.set(this._storeNames.cartID, null);
        this._storage.set(this._storeNames.userID, null);
        this._storage.set(this._storeNames.currID, null);
        this._storage.set(this._storeNames.promocode, null);
    }

    /**
     * Метод, реализующий реакцию на рассылку Диспетчера.
     * @param payload - полезная нагрузка запроса
     */
    override async _onDispatch(payload: dispatcherPayload) {
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
            await this._deleteAll();
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

        case CartActionTypes.SINGLE_INCREASE_NUMBER:
            await this._increaseNumber(payload.data);
            this._emitChange([CartActionTypes.SINGLE_INCREASE_NUMBER]);
            break;

        case CartActionTypes.SINGLE_ADD_TO_CART:
            await this._addToCart(payload.data);
            this._emitChange([CartActionTypes.SINGLE_ADD_TO_CART]);
            break;

        case CartActionTypes.SINGLE_DECREASE_NUMBER:
            await this._decreaseNumber(payload.data);
            this._emitChange([CartActionTypes.SINGLE_DECREASE_NUMBER]);
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

        case CartActionTypes.APPLY_PROMOCODE:
            await this._applyPromo(payload.data);
            this._emitChange([CartActionTypes.APPLY_PROMOCODE]);
            break;

        case CartActionTypes.CANCEL_PROMOCODE:
            await this._applyPromo();
            this._emitChange([CartActionTypes.CANCEL_PROMOCODE]);
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
            .catch((err) => console.log(err)) ?? [];

        const itemsCart = this._storage.get(this._storeNames.itemsCart);
        response?.items?.forEach((globalItem: productObj) => {
            let hasItem = false;
            itemsCart?.forEach((localItem: productObj, key: number) => {
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
                items: itemsCart.map(({id}: productObj) => id),
            }).catch((err) => console.log(err)) ?? [];
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
        if (userStore.getContext(userStore._storeNames.isAuth)) {
            const [status, response] = await request.makeGetRequest(config.api.cart)
                .catch((err) => console.log(err)) ?? [];

            this._storage.set(this._storeNames.responseCode, status);
            if (status === config.responseCodes.code200) {
                addSpacesToPrice(response.items);
                this._storage.set(this._storeNames.itemsCart, response.items ?? []);
                this._storage.set(this._storeNames.cartID, response.id);
                this._storage.set(this._storeNames.userID, response.userid);
                this._storage.set(this._storeNames.promocode, response.promocode);
            }
        } else {
            this._storage.set(this._storeNames.responseCode, config.responseCodes.code401);
        }
    }

    /**
     * Действие: удалить товар по ID.
     * @param id - идентификатор
     */
    async _deleteById(id: number) {
        const noNullItemsCart =
            this._storage.get(this._storeNames.itemsCart)
                .filter((item: productObj) => item.id !== id)
                .map((item: productObj) => item.id);
        const [status] = await request.makePostRequest(config.api.cart, {items: noNullItemsCart})
            .catch((err) => console.log(err)) ?? [];
        this._storage.set(this._storeNames.responseCode, status);
        this._storage.set(this._storeNames.itemsCart, noNullItemsCart);
    }

    /**
     * Действие: удалить все товары из корзины.
     */
    async _deleteAll() {
        const [status] = await request.makePostRequest(config.api.cart, {
            items: [],
        })
            .catch((err) => console.log(err)) ?? [];
        this._storage.set(this._storeNames.responseCode, status);
        this._storage.set(this._storeNames.itemsCart, []);
    }

    /**
     * Действие: добавить товар в корзину.
     * @param status - статус корзины
     * @param countChange - изменение количества
     * @param id - идентификатор
     */
    #editCountOfItem(status: number, countChange: number, id: number) {
        if (userStore.getContext(userStore._storeNames.isAuth)) {
            this._storage.set(this._storeNames.responseCode, status);
        }
        this._storage.set(this._storeNames.currID, id);
        const itemToAdd = itemsStore.getContext(itemsStore._storeNames.allCardsInCategory).find(
            (item: productObj) => item.id === Number(id));
        if (itemToAdd) {
            itemToAdd.count = countChange + (itemToAdd?.count ?? 0);
        }
        const currCartItems = this._storage.get(this._storeNames.itemsCart);
        const editItemIndex = currCartItems.findIndex((item: productObj) => item.id === itemToAdd.id);
        if (editItemIndex === -1) {
            currCartItems.push(itemToAdd);
        } else {
            currCartItems[editItemIndex] = itemToAdd;
        }
        this._storage.set(this._storeNames.itemsCart, currCartItems);
    }

    /**
     * Действие: добавить товар в корзину.
     * @param id - идентификатор
     */
    async _addToCart(id: number) {
        let status;
        if (userStore.getContext(userStore._storeNames.isAuth)) {
            [status] = await request.makePostRequest(config.api.insertIntoCart, {
                itemid: Number(id),
            }).catch((err) => console.log(err)) ?? [];
        }
        this.#editCountOfItem(status,
            1, id);
    }

    /**
     * Действие: увеличить количество товара.
     * @param id - идентификатор
     */
    async _increaseNumber(id: number) {
        await this._addToCart(id);
    }

    /**
     * Действие: уменьшить количество товара.
     * @param id - идентификатор
     */
    async _decreaseNumber(id: number) {
        let status;
        if (userStore.getContext(userStore._storeNames.isAuth)) {
            [status] = await request.makePostRequest(config.api.deleteFromCart, {
                itemid: Number(id),
            })
                .catch((err) => console.log(err)) ?? [];
        }
        await this.#editCountOfItem(status,
            -1, id);
    }

    /**
     * Действие: оформить заказ
     * @param data - данные для оформления заказа
     */
    async _makeOrder(data: OrderDataObj) {
        data.userid = this._storage.get(this._storeNames.userID);
        const [status] = await request.makePostRequest(config.api.makeOrder, data)
            .catch((err) => console.log(err)) ?? [];
        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames.itemsCart, data.items.reduce(
                (newItemsCart: any, id: number) =>
                    newItemsCart.filter((item: {id: number}) => item.id !== id),
                this._storage.get(this._storeNames.itemsCart)));
        }
    }

    /**
     * Действие: применить промокод.
     * @param data - строка с промокодом
     */
    async _applyPromo(data = '') {
        const [status] = await request
            .makePostRequest(config.api.setPromo, {promocode: data})
            .catch((err) => console.log(err)) ?? [];

        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames.promocode, data);
        }
    }
}

export default new CartStore();
