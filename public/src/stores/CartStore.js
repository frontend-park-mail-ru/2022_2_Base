import BaseStore from './BaseStore.js';
import {CartActionTypes} from '../actions/cart.js';
import request from '../modules/ajax.js';
import {config} from '../config.js';
import userStore from './UserStrore';
import itemsStore from './ItemsStore';
import sharedFunctions from "../modules/sharedFunctions";

/**
 * Класс, реализующий базовое хранилище.
 */
class CartStore extends BaseStore {
    #items = [
        {
            count: 1,
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
        {
            count: 2,
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
    ];

    #data = {
        addressID: 1111,
        city: 'Москва',
        street: 'Мира',
        house: 15,
        flat: 4,
        deliveryPrice: 'Бесплатно',
        date: new Date('2022-11-25'),
        // paymentMethodProvider: mirIcon,
        avatar: './img/Smartphone.png',
        username: 'Джахар',
        phone: '+7 (872) 234-23-65',
        deliveryDate: this.#getDate(1),
        deliveryTime: '18:00 - 23:00',
        cardNumber: '8765432143212546',
        expiry: '05 / 24',
        paymentCardId: 1,
        auth: true,
    };

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
        this._storage.set(this._storeNames.itemsCart, []); // this.#items
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

        case CartActionTypes.MAKEORDER:
            await this._makeOrder(payload.data);
            this._emitChange([CartActionTypes.MAKEORDER]);
            break;

        case CartActionTypes.RESET_CART:
            await this._resetCart();
            break;

        case CartActionTypes.MERGE_CART:
            await this._mergeCart();
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
        console.log('itemsCart', itemsCart);
        console.log('response', response);
        response.items.forEach((globalItem) => {
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
        console.log('merge', itemsCart);

        if (status === config.responseCodes.code200) {
            console.log(response);
            this._storage.set(this._storeNames.cartID, response.id);
            this._storage.set(this._storeNames.userID, response.userid);
            this._storage.set(this._storeNames.itemsCart, response.items);
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
            sharedFunctions.addSpacesToPrice(response.items);
            this._storage.set(this._storeNames.itemsCart, response.items);
            this._storage.set(this._storeNames.cartID, response.id);
            this._storage.set(this._storeNames.userID, response.userid);
        }
    }

    /**
     * Действие: удалить товар по ID.
     * @param {number} id
     */
    async _deleteById(id) {
        const itemsCart = this._storage.get(this._storeNames.itemsCart);
        itemsCart.forEach((item, key) => {
            if (item.id === id) {
                delete itemsCart[key];
            }
        });
        itemsCart.filter((item) => item);
        const [status] = await request.makePostRequest(config.api.cart, itemsCart)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames.itemsCart, itemsCart);
        }
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
        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames.itemsCart, []);
        }
    }

    /**
     * Действие: добавить товар в корзину.
     * @param {int} status
     * @param {int} countChange
     * @param {int} id
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
        const editItemIndex = currCartItems.findIndex((id) => id === itemToAdd.id);
        if (editItemIndex === -1) {
            currCartItems.push(itemToAdd);
        } else {
            currCartItems[editItemIndex] = itemToAdd;
        }
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
        data.card = this._storage.get(this._storeNames.cartID);
        const [status] = await request.makePostRequest(config.api.makeOrder, data)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            const itemsCart = this._storage.get(this._storeNames.itemsCart);
            data.items.forEach((id) => {
                itemsCart.forEach((item, key) => {
                    if (item.id === id) {
                        delete itemsCart[key];
                    }
                });
            });
            this._storage.set(this._storeNames.itemsCart, itemsCart);
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
