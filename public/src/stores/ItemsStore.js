import BaseStore from './BaseStore.js';
import {ItemCardsActionTypes} from '../actions/itemCards';
import request from '../modules/ajax';
import {config} from '../config';

/**
 * Класс, реализующий базовое хранилище.
 */
class ItemsStore extends BaseStore {
    #topCategory = {
        Smartphone: {
            nameCategory: 'Телефоны',
            img: './img/Smartphone.png',
        },
        Computer: {
            nameCategory: 'Компьютеры',
            img: './img/Computer.png',
        },
        Headphones: {
            nameCategory: 'Наушники',
            img: './img/Headphones.png',
        },
        TV: {
            nameCategory: 'Телевизоры',
            img: './img/TV.png',
        },
        Watch: {
            nameCategory: 'Часы',
            img: './img/Watch.png',
        },
        Tablet: {
            nameCategory: 'Планшеты',
            img: './img/Tablet.png',
        },
        Accessories: {
            nameCategory: 'Аксессуары',
            img: './img/Accessories.png',
        },
    };


    _storeNames = {
        topCategory: 'topCategory',
        responseCode: 'responseCode',
        cardsBySales: 'cardsBySales',
        cardsByPopularity: 'cardsByPopularity',
    };

    /**
     * @constructor
     */
    constructor() {
        super();
        this._storage = new Map();
        this._storage.set(this._storeNames.topCategory, this.#topCategory);
        this._storage.set(this._storeNames.responseCode, null);
        this._storage.set(this._storeNames.cardsByPopularity, null);
        this._storage.set(this._storeNames.cardsBySales, null);
    }


    /**
     * Метод, реализующий реакцию на рассылку Диспетчера.
     * @param {Object} payload полезная нагрузка запроса
     */
    async _onDispatch(payload) {
        switch (payload.actionName) {
        case ItemCardsActionTypes.ITEM_CARDS_GET_BY_SALES:
            await this._getSalesItemCards();
            this._emitChange([ItemCardsActionTypes.ITEM_CARDS_GET_BY_SALES]);
            break;

        case ItemCardsActionTypes.ITEM_CARDS_GET_POPULAR:
            await this._getPopularItemCards();
            this._emitChange([ItemCardsActionTypes.ITEM_CARDS_GET_POPULAR]);
            break;

        case ItemCardsActionTypes.ITEM_CARDS_GET_BY_CATEGORY:
            await this._getItemCardsByCategory();
            this._emitChange([ItemCardsActionTypes.ITEM_CARDS_GET_BY_CATEGORY]);
            break;

        case ItemCardsActionTypes.ITEM_CARDS_SEARCH:
            await this._searchItemCards();
            this._emitChange([ItemCardsActionTypes.ITEM_CARDS_SEARCH]);
            break;

        case ItemCardsActionTypes.ITEM_CARD_GET:
            await this._getItemCard();
            this._emitChange([ItemCardsActionTypes.ITEM_CARD_GET]);
            break;
        }
    }

    /**
     * Действие: запрос списка карточек по скидке.
     */
    async _getSalesItemCards() {
        const [status, outD] = await request.makeGetRequest(config.api.products)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);

        if (status === 200) {
            this._storage.set(this._storeNames.cardsBySales, outD.body);
        }
    }

    /**
     * Действие: запрос списка популярных карточек.
     */
    async _getPopularItemCards() {
        const [status, outD] = await request.makeGetRequest(config.api.products)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);

        console.log(status, outD);
        if (status === 200) {
            this._storage.set(this._storeNames.cardsByPopularity, outD.body);
        }
    }

    /**
     * Действие: запрос списка карточек по категориям.
     * @param {String} category - категория
     */
    async _getItemCardsByCategory(category) {

    }

    /**
     * Действие: запрос списка карточек на основании ввода пользователя.
     * @param {String} searchString - строка для поиска
     */
    async _searchItemCards(searchString) {
    }

    /**
     * Действие: запрос карточки с определенным id.
     * @param {number} id
     */
    async _getItemCard(id) {

    }
}

export default new ItemsStore();
