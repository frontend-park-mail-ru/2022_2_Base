import BaseStore from './BaseStore.js';
import {ItemCardsActionTypes} from '../actions/itemCards';
import request from '../modules/ajax';
import {config} from '../config.js';

/**
 * Класс, реализующий базовое хранилище.
 */
class ItemsStore extends BaseStore {
    #topCategory = {
        Smartphone: {
            nameCategory: 'Телефоны',
            img: './img/Smartphone.png',
            href: config.href.category + '/phones',
        },
        Computer: {
            nameCategory: 'Компьютеры',
            img: './img/Computer.png',
            href: config.href.category + '/computers',
        },
        Monitors: {
            nameCategory: 'Мониторы',
            img: './img/Monitors.png',
            href: '/category/monitors',
        },
        TV: {
            nameCategory: 'Телевизоры',
            img: './img/TV.png',
            href: '/category/televisors',
        },
        Watch: {
            nameCategory: 'Часы',
            img: './img/Watch.png',
            href: '/category/watches',
        },
        Tablet: {
            nameCategory: 'Планшеты',
            img: './img/Tablet.png',
            href: config.href.category + '/tablets',
        },
        Accessories: {
            nameCategory: 'Аксессуары',
            img: './img/Accessories.png',
            href: '/category/accessories',
        },
    };

    _storeNames = {
        topCategory: 'topCategory',
        responseCode: 'responseCode',
        cardsHome: 'cardsHome',
        cardsCategory: 'cardsCategory',
    };

    /**
     * @constructor
     */
    constructor() {
        super();
        this._storage = new Map();
        this._storage.set(this._storeNames.topCategory, this.#topCategory);
        this._storage.set(this._storeNames.responseCode, null);
        this._storage.set(this._storeNames.cardsHome, null);
        this._storage.set(this._storeNames.cardsCategory, null);
    }

    /**
     * Метод, реализующий реакцию на рассылку Диспетчера.
     * @param {Object} payload полезная нагрузка запроса
     */
    async _onDispatch(payload) {
        switch (payload.actionName) {
        case ItemCardsActionTypes.ITEM_CARDS_GET_HOME:

            await this._getItemCardsHome(payload.data);
            this._emitChange([ItemCardsActionTypes.ITEM_CARDS_GET_HOME]);
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
     * Действие: запрос списка популярных карточек.
     */
    async _getItemCardsHome({path, popularCard}) {
        const [status, outD] = await request.makeGetRequest(path)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);

        if (status === 200) {
            this._storage.set(this._storeNames.cardsHome, {
                classToGet: popularCard ? 'popularCard' : 'salesCard',
                body: outD.body,
            });
        }
    }

    /**
     * Действие: запрос списка карточек по категориям.
     */
    async _getItemCardsByCategory() {
        const [status, response] = await request.makeGetRequest(config.api.category +
            document.location.pathname.slice(document.location.pathname.lastIndexOf('/'),
                document.location.pathname.length) + `?first=${0}&count=${5}`)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);

        if (status === 200) {
            this._storage.set(this._storeNames.cardsCategory, response.body);
        }
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
