'use strict';

import Dispatcher from '../modules/dispatcher.js';

/**
 * Константа, содержащая в себе типы действий в профиле.
 */
export const ProfileActionTypes = {
    GET_DATA: 'GET_DATA',
    SAVE_EDIT_DATA: 'SAVE_EDIT_DATA',
    DOWNLOAD_PHOTO: 'DOWNLOAD_PHOTO',
    GET_CARDS: 'GET_CARDS',
    SAVE_ADD_CARD: 'SAVE_ADD_CARD',
    SAVE_EDIT_CARD: 'SAVE_EDIT_CARD',
    DELETE_CARD: 'DELETE_CARD',
    GET_ADDRESS: 'GET_ADDRESS',
    SAVE_ADD_ADDRESS: 'SAVE_ADD_ADDRESS',
    SAVE_EDIT_ADDRESS: 'SAVE_EDIT_ADDRESS',
    DELETE_ADDRESS: 'DELETE_ADDRESS',
};

/**
 * Класс, содержащий в себе действия в профиле.
 */
export const ProfileAction = {
    /**
     * Действие: запрос данных пользователя.
     */
    getData() {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.GET_DATA,
        });
    },

    /**
     * Действие: редактировать данные.
     * @param {String} field - отредактированное поле
     * @param {String} newData - новые данные
     */
    saveEditData(field, newData) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.SAVE_EDIT_DATA,
            data: {
                field,
                newData,
            },
        });
    },

    /**
     * Действие: загрузка фото.
     */
    downloadPhoto() {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.DOWNLOAD_PHOTO,
        });
    },

    /**
     * Действие: запрос банковских карточек.
     */
    getCards() {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.GET_CARDS,
        });
    },

    /**
     * Действие: добавить новую банковскую карту.
     * @param {String} number - номер карты
     * @param {String} name - имя на карте
     * @param {Date} endDate - дата истечения
     * @param {number} code - код
     */
    saveAddCard(number, name, endDate, code) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.SAVE_ADD_CARD,
            data: {
                number,
                name,
                endDate,
                code,
            },
        });
    },

    /**
     * Действие: редактировать данные банковской карты.
     * @param {Number} id
     * @param {Number} number - номер карты
     * @param {Date} date - дата
     * @param {number} code - код
     */
    saveEditCard(id, number, date, code) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.SAVE_EDIT_CARD,
            data: {
                id,
                number,
                date,
                code,
            },
        });
    },

    /** Удаление банковской карты с определенным id.
     * @param {number} id
     */
    deleteCard(id) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.DELETE_CARD,
            data: {id},
        });
    },

    /**
     * Действие: запрос адресов.
     */
    getAddress() {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.GET_ADDRESS,
        });
    },

    /**
     * Действие: добавить новый адрес.
     * @param {String} country - страна
     * @param {String} city - город
     * @param {String} street - улица
     * @param {String} house - дом
     * @param {Number} apartmentNumber - номер квартиры
     */
    saveAddAddress(country, city, street, house, apartmentNumber) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.SAVE_ADD_ADDRESS,
            data: {
                country,
                city,
                street,
                house,
                apartmentNumber,
            },
        });
    },

    /**
     * Действие: редактировать адрес.
     * @param {Number} id
     * @param {String} country - страна
     * @param {String} city - город
     * @param {String} street - улица
     * @param {String} house - дом
     * @param {Number} apartmentNumber - номер квартиры
     */
    saveEditAddress(id, country, city, street, house, apartmentNumber) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.SAVE_EDIT_ADDRESS,
            data: {
                id,
                country,
                city,
                street,
                house,
                apartmentNumber,
            },
        });
    },

    /** Удаление адреса с определенным id.
     * @param {number} id
     */
    deleteAddress(id) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.DELETE_ADDRESS,
            data: {id},
        });
    },
};
