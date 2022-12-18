import BaseStore from './BaseStore';
import {ItemCardsActionTypes} from '../actions/itemCards';
import request from '../modules/ajax';
import {config} from '../config';
import cartStore from './CartStore';
import {addSpacesToPrice} from '../modules/sharedFunctions';

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
        comments: 'comments',
        suggestionsSearch: 'suggestionsSearch',
        isFirstRequest: 'isFirstRequest',
    };

    /**
     * constructor
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
        this._storage.set(this._storeNames.comments, []);
        this._storage.set(this._storeNames.suggestionsSearch, []);
        this._storage.set(this._storeNames.isFirstRequest, false);
    }

    /**
     * Метод, реализующий реакцию на рассылку Диспетчера.
     * @param payload - полезная нагрузка запроса
     */
    override async _onDispatch(payload: dispatcherPayload) {
        switch (payload.actionName) {
        case ItemCardsActionTypes.ITEM_CARDS_GET_SALES:
            await this._getHorizontalItemCards(config.api.products + `?lastitemid=${0}&count=${6}`);
            this._emitChange([ItemCardsActionTypes.ITEM_CARDS_GET_SALES]);
            break;
        case ItemCardsActionTypes.ITEM_CARDS_GET_POPULAR:
            await this._getHorizontalItemCards(config.api.products + `?lastitemid=${0}&count=${6}`);
            this._emitChange([ItemCardsActionTypes.ITEM_CARDS_GET_POPULAR]);
            break;
        case ItemCardsActionTypes.ITEM_CARDS_GET_RECOMMENDED:
            await this._getHorizontalItemCards(`${config.api.recommendations}/${payload.data}`);
            this._emitChange([ItemCardsActionTypes.ITEM_CARDS_GET_RECOMMENDED]);
            break;
        case ItemCardsActionTypes.ITEM_CARDS_GET_BY_CATEGORY:
            await this._getItemCardsByCategory(payload.data);
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

        case ItemCardsActionTypes.GET_COMMENTS:
            await this._getComments();
            this._emitChange([ItemCardsActionTypes.GET_COMMENTS]);
            break;

        case ItemCardsActionTypes.ADD_COMMENT:
            await this._addComment(payload.data);
            this._emitChange([ItemCardsActionTypes.ADD_COMMENT]);
            break;

        case ItemCardsActionTypes.GET_SEARCH_RESULTS:
            await this._getSearchResults(payload.data);
            this._emitChange([ItemCardsActionTypes.GET_SEARCH_RESULTS]);
            break;

        case ItemCardsActionTypes.GET_SUGGESTION_SEARCH:
            await this._getSuggestionSearch(payload.data);
            this._emitChange([ItemCardsActionTypes.GET_SUGGESTION_SEARCH]);
            break;

        case ItemCardsActionTypes.LOCAL_SORT_RATING:
            await this._localSortRating(payload.data);
            this._emitChange([ItemCardsActionTypes.LOCAL_SORT_RATING]);
            break;

        case ItemCardsActionTypes.LOCAL_SORT_PRICE:
            await this._localSortPrice(payload.data);
            this._emitChange([ItemCardsActionTypes.LOCAL_SORT_PRICE]);
            break;
        }
    }

    /**
     * Действие: запрос списка карточек.
     * @param path - запрос для получения данных о товарах
     */
    async _getHorizontalItemCards(path: string) {
        const [status, response] = await request
            // .makeGetRequest(config.api.products + `?lastitemid=${0}&count=${6}`)
            // .makeGetRequest(`${config.api.recommendations}/1`)
            .makeGetRequest(path)
            .catch((err) => console.log(err)) ?? [];
        this._storage.set(this._storeNames.responseCode, status);

        if (status === config.responseCodes.code200) {
            this.#syncWithCart(response.body);
            addSpacesToPrice(response.body);
            this._storage.set(this._storeNames.cardsHome, response.body);
            this.#syncCardsInCategory(response.body);
        }
    }
    //
    // /**
    //  * Действие: запрос списка карточек.
    //  */
    // async _getSalesItemCards() {
    //     const [status, response] = await request
    //         .makeGetRequest(config.api.products + `?lastitemid=${0}&count=${6}`)
    //         // .makeGetRequest(`${config.api.recommendations}/1`)
    //         .catch((err) => console.log(err)) ?? [];
    //     this._storage.set(this._storeNames.responseCode, status);
    //
    //     if (status === config.responseCodes.code200) {
    //         this.#syncWithCart(response.body);
    //         addSpacesToPrice(response.body);
    //         this._storage.set(this._storeNames.cardsHome, response.body);
    //         this.#syncCardsInCategory(response.body);
    //     }
    // }

    /**
     * Действие: запрос списка дешевых карточек.
     * @param isLowToHighPrice - получали ли мы до этого карточки
     */
    _getByPriceItemCard(isLowToHighPrice: boolean) {
        this._storage.set(this._storeNames.isFirstRequest, true);
        this._storage.set(this._storeNames.sortURL,
            config.queryParams.sort.base +
            (isLowToHighPrice ?
                config.queryParams.sort.priceUp : config.queryParams.sort.priceDown));
    }

    /**
     * Действие: запрос списка карточек с высоким рейтингом.
     * @param isLowToHighRating - получали ли мы до этого карточки
     */
    _getByRatingItemCard(isLowToHighRating: boolean) {
        this._storage.set(this._storeNames.isFirstRequest, true);
        this._storage.set(this._storeNames.sortURL,
            config.queryParams.sort.base +
            (isLowToHighRating ?
                config.queryParams.sort.ratingUp : config.queryParams.sort.ratingDown));
    }

    /**
     * Действие: запрос списка дешевых карточек.
     * @param isLowToHighPrice - получали ли мы до этого карточки
     */
    _localSortPrice(isLowToHighPrice: boolean) {
        this._storage.set(this._storeNames.isFirstRequest, true);
        this._storage.set(this._storeNames.cardsCategory,
            this._storage.get(this._storeNames.cardsCategory).sort((isLowToHighPrice ?
                (item1st: productObj, item2nd: productObj) => {
                    return item1st.lowprice - item2nd.lowprice;
                } :
                (item1st: productObj, item2nd: productObj) => {
                    return item2nd.lowprice - item1st.lowprice;
                })));
        this._getByPriceItemCard(isLowToHighPrice);
    }

    /**
     * Действие: запрос списка карточек с высоким рейтингом.
     * @param isLowToHighRating - получали ли мы до этого карточки
     */
    _localSortRating(isLowToHighRating: boolean) {
        this._storage.set(this._storeNames.isFirstRequest, true);
        this._storage.set(this._storeNames.cardsCategory,
            this._storage.get(this._storeNames.cardsCategory).sort((isLowToHighRating ?
                (item1st: productObj, item2nd: productObj) => {
                    return item1st.rating - item2nd.rating;
                } :
                (item1st: productObj, item2nd: productObj) => {
                    return item2nd.rating - item1st.rating;
                })));
        this._getByRatingItemCard(isLowToHighRating);
    }

    /**
     * Синхронизируем количество товаров в корзине
     * @param items - полученные товары
     */
    #syncWithCart(items: Array<productObj>) {
        if (Array.isArray(items)) {
            items.forEach((item) => {
                this.#syncItemWithCart(item);
            });
        }
    }

    /**
     * Синхронизируем количество товара в корзине
     * @param item - полученный товар
     */
    #syncItemWithCart(item: productObj) {
        const cartItems = cartStore.getContext(cartStore._storeNames.itemsCart);
        if (Array.isArray(cartItems)) {
            cartItems.forEach((cartItem) => {
                if (cartItem.id === item.id) {
                    item.count = cartItem.count;
                }
            });
        }
    }

    /**
     * Действие: запрос списка карточек по категориям.
     * @returns путь запроса к серверу
     */
    #getRequestPathWithQueryParams() {
        return config.api.category +
            document.location.pathname.slice(
                document.location.pathname.lastIndexOf('/'),
                document.location.pathname.length,
            ) +
            `?lastitemid=${this._storage.get(this._storeNames.cardLoadCount)}` +
            `&count=${5}&${window.location.search.substring(1)}`;
    }

    /**
     * Действие: запрос списка карточек по категориям.
     * @param isFirstRequest - получали ли мы до этого карточки
     */
    async _getItemCardsByCategory(isFirstRequest: boolean) {
        this._storage.set(this._storeNames.isFirstRequest, false);
        if (isFirstRequest) {
            this._storage.set(this._storeNames.cardLoadCount, 0);
            this._storage.set(this._storeNames.isFirstRequest, true);
            this._storage.set(this._storeNames.allCardsInCategory, []);
        }

        const [status, response] = await request
            .makeGetRequest(this.#getRequestPathWithQueryParams())
            .catch((err) => console.log(err)) ?? [];
        this._storage.set(this._storeNames.responseCode, status);

        if (status === config.responseCodes.code200) {
            this.#syncWithCart(response.body);
            addSpacesToPrice(response.body);
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
     * Функция, обновляющая информацию о загруженных картах
     * @param body - данные для добавления
     */
    #syncCardsInCategory(body: object) {
        this._storage.set(
            this._storeNames.allCardsInCategory,
            this._storage
                .get(this._storeNames.allCardsInCategory)
                .concat(body),
        );
    }

    /**
     * Действие: запрос карточки с определенным id.
     */
    async _getItemCard() {
        const [status, response] = await request
            .makeGetRequest(config.api.products +
                document.location.pathname.slice(
                    document.location.pathname.lastIndexOf('/'),
                    document.location.pathname.length,
                ))
            .catch((err) => console.log(err)) ?? [];
        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            this.#syncItemWithCart(response.body);
            addSpacesToPrice(response.body);
            this._storage.set(this._storeNames.itemData, response.body);
            this.#syncCardsInCategory(response.body);
        }
    }

    /**
     * Действие: получение отзывов отзыва.
     */
    async _getComments() {
        const [status, response] = await request
            .makeGetRequest(config.api.getComments +
                document.location.pathname.slice(
                    document.location.pathname.lastIndexOf('/'),
                    document.location.pathname.length,
                ))
            .catch((err) => console.log(err)) ?? [];
        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames.comments, response.body);
            this.#syncCardsInCategory(response.body);
        }
    }

    /**
     * Действие: синхронизация списка карточек поиска с корзиной.
     */
    async _searchItemCards() {
        this.#syncWithCart(this._storage.get(this._storeNames.cardsCategory));
        addSpacesToPrice(this._storage.get(this._storeNames.cardsCategory));
    }

    /**
     * Действие: запрос списка карточек на основании ввода пользователя.
     * @param searchString - строка для поиска
     */
    async _getSearchResults(searchString: string) {
        const [status, response] = await request
            .makePostRequest(config.api.search, {search: searchString})
            .catch((err) => console.log(err)) ?? [];

        this._storage.set(this._storeNames.responseCode, status);
        if (status === config.responseCodes.code200) {
            this._storage.set(this._storeNames.cardsCategory, response.body);
        }
    }


    /**
     * Действие: запрос списка карточек на основании ввода пользователя.
     * @param data - строка для поиска
     */
    async _getSuggestionSearch(data: suggestionSearchObj) {
        if (data.isCategory) {
            this._storage.set(this._storeNames.suggestionsSearch, {search: data.searchString});
        } else {
            const [status, response] = await request
                .makePostRequest(config.api.suggestionSearch, {search: data.searchString})
                .catch((err) => console.log(err)) ?? [];

            this._storage.set(this._storeNames.responseCode, status);
            if (status === config.responseCodes.code200) {
                this._storage.set(this._storeNames.suggestionsSearch, response.body);
            }
        }
    }

    /**
     * Действие: отправка отзыва.
     * @param comment - данные отзыва
     */
    async _addComment(comment: commentObj) {
        comment.itemid = this._storage.get(this._storeNames.itemData).id;
        comment.userid = cartStore.getContext(cartStore._storeNames.userID);
        const [status] = await request
            .makePostRequest(config.api.makeComment, comment);
        this._storage.set(this._storeNames.responseCode, status);
    }
}

export default new ItemsStore();
