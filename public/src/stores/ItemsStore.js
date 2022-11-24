import BaseStore from './BaseStore.js';
import {ItemCardsActionTypes} from '../actions/itemCards';
import request from '../modules/ajax';
import {config} from '../config.js';
import cartStore from './CartStore';
import sharedFunctions from '../modules/sharedFunctions';

/**
 * Класс, реализующий базовое хранилище.
 */
class ItemsStore extends BaseStore {
    #topCategory = {
        Smartphone: {
            nameCategory: 'Телефоны',
            img: './img/Smartphone.webp',
            href: config.href.category + '/phones',
        },
        Computer: {
            nameCategory: 'Компьютеры',
            img: './img/Computer.webp',
            href: config.href.category + '/computers',
        },
        Monitors: {
            nameCategory: 'Мониторы',
            img: './img/Monitors.webp',
            href: config.href.category + '/monitors',
        },
        TV: {
            nameCategory: 'Телевизоры',
            img: './img/TV.webp',
            href: config.href.category + '/tvs',
        },
        Watch: {
            nameCategory: 'Часы',
            img: './img/Watch.webp',
            href: config.href.category + '/watches',
        },
        Tablet: {
            nameCategory: 'Планшеты',
            img: './img/Tablet.webp',
            href: config.href.category + '/tablets',
        },
        Accessories: {
            nameCategory: 'Аксессуары',
            img: './img/Accessories.webp',
            href: config.href.category + '/accessories',
        },
    };

    _storeNames = {
        topCategory: 'topCategory',
        responseCode: 'responseCode',
        cardsHome: 'cardsHome',
        cardsCategory: 'cardsCategory',
        cardLoadCount: 'cardLoadCount',
        allCardsInCategory: 'allCardsInCategory',
        sortURL: 'sortURL',
        itemData: 'itemData',
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
        this._storage.set(this._storeNames.cardLoadCount, null);
        this._storage.set(this._storeNames.allCardsInCategory, []);
        this._storage.set(this._storeNames.sortURL, null);
        this._storage.set(this._storeNames.itemData, {});
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
            await this._getItemCardsByCategory(payload.data);
            this._emitChange([ItemCardsActionTypes.ITEM_CARDS_GET_BY_CATEGORY]);
            break;

        case ItemCardsActionTypes.ITEM_CARDS_SEARCH:
            await this._searchItemCards(payload.data);
            this._emitChange([ItemCardsActionTypes.ITEM_CARDS_SEARCH]);
            break;

        case ItemCardsActionTypes.ITEM_CARD_GET:
            await this._getItemCard(payload.data);
            this._emitChange([ItemCardsActionTypes.ITEM_CARD_GET]);
            break;

        case ItemCardsActionTypes.POPULAR_ITEM_CARDS_GET_BY_CATEGORY:
            await this._getPopularItemCard(payload.data);
            this._emitChange([ItemCardsActionTypes.ITEM_CARD_GET]);
            break;

        case ItemCardsActionTypes.CHEAP_ITEM_CARDS_GET_BY_CATEGORY:
            await this._getByPriceItemCard(payload.data);
            this._emitChange([
                ItemCardsActionTypes.CHEAP_ITEM_CARDS_GET_BY_CATEGORY,
            ]);
            break;

        case ItemCardsActionTypes.HIGH_RATING_ITEM_CARDS_GET_BY_CATEGORY:
            await this._getByRatingItemCard(payload.data);
            this._emitChange([
                ItemCardsActionTypes.HIGH_RATING_ITEM_CARDS_GET_BY_CATEGORY,
            ]);
            break;
        }
    }

    /**
   * Действие: запрос списка карточек.
   */
    async _getItemCardsHome({path, popularCard}) {
        const [status, response] = await request
            .makeGetRequest(path + `?lastitemid=${0}&count=${6}`)
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);

        if (status === config.responseCodes.code200) {
            this.#syncWithCart(response.body);
            sharedFunctions.addSpacesToPrice(response.body);
            this._storage.set(this._storeNames.cardsHome, {
                classToGet: popularCard ? 'popularCard' : 'salesCard',
                body: response.body,
            });
            this.#syncCardsInCategory(response.body);
        }
    }

    /**
   * Действие: запрос списка популярных карточек.
   * @param {boolean} isFirstRequest - получали ли мы до этого карточки
   */
    _getPopularItemCard(isFirstRequest) {
    }

    /**
   * Действие: запрос списка дешевых карточек.
   * @param {boolean} isLowToHighPrice - получали ли мы до этого карточки
   */
    _getByPriceItemCard(isLowToHighPrice) {
        this._storage.set(this._storeNames.sortURL,
            config.queryParams.sort.base +
            (isLowToHighPrice ?
                config.queryParams.sort.priceUp : config.queryParams.sort.priceDown));
    }

    /**
   * Действие: запрос списка карточек с высоким рейтингом.
   * @param {boolean} isLowToHighRating - получали ли мы до этого карточки
   */
    _getByRatingItemCard(isLowToHighRating) {
        this._storage.set(this._storeNames.sortURL,
            config.queryParams.sort.base +
            (isLowToHighRating ?
                config.queryParams.sort.ratingUp : config.queryParams.sort.ratingDown));
    }

    /**
   * Синхранизируем количество товаров в корзине
   * @param {object} items - полученные товары
   */
    #syncWithCart(items) {
        const cartItems = cartStore.getContext(cartStore._storeNames.itemsCart);
        if (items && cartItems && items.length && cartItems.length) {
            items.forEach((item) => {
                cartItems.forEach((cartItem) => {
                    if (cartItem.id === item.id) {
                        item.count = cartItem.count;
                    }
                });
            });
        }
    }

    /**
   * Действие: запрос списка карточек по категориям.
   * @param {boolean} isFirstRequest - получали ли мы до этого карточки
   */
    async _getItemCardsByCategory(isFirstRequest) {
        if (isFirstRequest) {
            this._storage.set(this._storeNames.cardLoadCount, 0);
            this._storage.set(this._storeNames.allCardsInCategory, []);
        }

        const [status, response] = await request
            .makeGetRequest(
                config.api.category +
          document.location.pathname.slice(
              document.location.pathname.lastIndexOf('/'),
              document.location.pathname.length,
          ) +
          `?lastitemid=${this._storage.get(
              this._storeNames.cardLoadCount,
          )}&count=${5}&${window.location.search.substring(1)}`,
            )
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);

        if (status === config.responseCodes.code200) {
            this.#syncWithCart(response.body);
            sharedFunctions.addSpacesToPrice(response.body);
            this._storage.set(this._storeNames.cardsCategory, response.body);
            this.#syncCardsInCategory(response.body);

            if (response.body[response.body.length - 1]) {
                this._storage.set(
                    this._storeNames.cardLoadCount,
                    response.body[response.body.length - 1].id,
                );
            } else if (this._storage.get(this._storeNames.cardLoadCount)) {
                this._storage.set(this._storeNames.cardLoadCount, config.states.endOf);
            }
        }
    }

    /**
   * Действие: запрос списка карточек на основании ввода пользователя.
   * @param {String} searchString - строка для поиска
   */
    async _searchItemCards(searchString) {}


    /**
     * Функция, обновляющая информацию о загруженных картах
     * @param {object} body - данные для добавления
     */
    #syncCardsInCategory(body) {
        this._storage.set(
            this._storeNames.allCardsInCategory,
            this._storage
                .get(this._storeNames.allCardsInCategory)
                .concat(body),
        );
    }

    /**
   * Действие: запрос карточки с определенным id.
   * @param {number} id
   */
    async _getItemCard(id) {
        const [status, response] = await request
            .makeGetRequest(config.api.item +
                document.location.pathname.slice(
                    document.location.pathname.lastIndexOf('/'),
                    document.location.pathname.length,
                ))
            .catch((err) => console.log(err));
        this._storage.set(this._storeNames.responseCode, status);

        if (status === config.responseCodes.code200) {
            this.#syncWithCart(response.body);
            // sharedFunctions.addSpacesToPrice(response.body);
            this._storage.set(this._storeNames.itemData, response.body);
            this.#syncCardsInCategory(response.body);
        }
    }
}

export default new ItemsStore();
