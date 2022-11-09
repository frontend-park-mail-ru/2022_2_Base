'use strict';

import Dispatcher from '../modules/dispatcher.js';

/**
 * Константа, содержащая в себе типы действий в профиле.
 */
export const ProfileActionTypes = {
    GET_DATA: 'GET_DATA',
    SAVE_EDIT_DATA: 'SAVE_EDIT_DATA',
    UPLOAD_AVATAR: 'UPLOAD_AVATAR',
    DELETE_AVATAR: 'DELETE_AVATAR',
    GET_CARDS: 'GET_CARDS',
    SAVE_ADD_CARD: 'SAVE_ADD_CARD',
    SAVE_EDIT_CARD: 'SAVE_EDIT_CARD',
    DELETE_CARD: 'DELETE_CARD',
    GET_ADDRESS: 'GET_ADDRESS',
    SAVE_ADD_ADDRESS: 'SAVE_ADD_ADDRESS',
    SAVE_EDIT_ADDRESS: 'SAVE_EDIT_ADDRESS',
    DELETE_ADDRESS: 'DELETE_ADDRESS',
    GET_BASKET: 'GET_BASKET',
    SAVE_EDIT_DELIVERY: 'SAVE_EDIT_DELIVERY',
};

/**
 * Класс, содержащий в себе действия в профиле.
 */
export const profileAction = {
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
     * @param {object} data - отредактированное поле
     */
    saveEditData( data) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.SAVE_EDIT_DATA,
            data: data,
        });
    },

    /**
     * Действие: загрузка аватара.
     * @param {Blob} avatar - аватар
     */
    uploadAvatar(avatar) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.UPLOAD_AVATAR,
            data: avatar,
        });
    },

    /**
     * Действие: удаление аватара.
     */
    deleteAvatar() {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.DELETE_AVATAR,
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
     * @param {object} data - данные для обработки
     */
    saveEditCard(data) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.SAVE_EDIT_CARD,
            data: data,
        });
    },

    /** Удаление банковской карты с определенным id.
     * @param {number} id
     */
    deleteCard(id) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.DELETE_CARD,
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
     * @param {object} data - данные для обработки
     */
    saveAddAddress(data) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.SAVE_ADD_ADDRESS,
            data: data,
        });
    },

    /**
     * Действие: редактировать адрес.
     * @param {object} data - данные для обработки
     */
    saveEditAddress(data) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.SAVE_EDIT_ADDRESS,
            data: data,
        });
    },

    /** Удаление адреса с определенным id.
     * @param {number} id
     */
    deleteAddress(id) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.DELETE_ADDRESS,
            data: {id},
        });
    },
    /**
     * Действие: редактировать данные доставки.
     * @param {String} address - адрес
     * @param {String} price - стоимость
     * @param {String} date - дата
     */
    saveEditDelivery(address, price, date) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.SAVE_EDIT_DELIVERY,
            data: {
                address,
                price,
                date,
            },
        });
    },

    /**
     * Действие: запрос корзины.
     */
    getBasket() {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.GET_BASKET,
        });
    },
};
