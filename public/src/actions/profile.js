'use strict';

import Dispatcher from '../modules/dispatcher.js';

/**
 * Константа, содержащая в себе типы действий в профиле.
 */
export const ProfileActionTypes = {
    GET_DATA: 'GET_DATA',
    POPUP_EDIT_DATA_SHOW: 'POPUP_EDIT_DATA_SHOW',
    POPUP_EDIT_DATA_SUBMIT: 'POPUP_EDIT_DATA_SUBMIT',
    POPUP_HIDE: 'POPUP_HIDE',
    DOWNLOAD_PHOTO: 'POPUP_EDIT_PHOTO_SHOW',
    GET_CARDS: 'GET_CARDS',
    POPUP_ADD_CARD_SHOW: 'POPUP_ADD_CARD_SHOW',
    POPUP_ADD_CARD_SUBMIT: 'POPUP_ADD_CARD_SUBMIT',
    POPUP_EDIT_CARD_SHOW: 'POPUP_EDIT_CARD_SHOW',
    POPUP_EDIT_CARD_SUBMIT: 'POPUP_EDIT_CARD_SUBMIT',
    DELETE_CARD: 'DELETE_CARD',
    GET_ADDRESS: 'GET_ADDRESS',
    POPUP_ADD_ADDRESS_SHOW: 'POPUP_ADD_ADDRESS_SHOW',
    POPUP_ADD_ADDRESS_SUBMIT: 'POPUP_ADD_ADDRESS_SUBMIT',
    POPUP_EDIT_ADDRESS_SHOW: 'POPUP_EDIT_ADDRESS_SHOW',
    POPUP_EDIT_ADDRESS_SUBMIT: 'POPUP_EDIT_ADDRESS_SUBMIT',
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
     * Действие: Отобразить popup редактирования данных пользователя.
     * @param {any} id
     */
    showEditDataPopUp(id) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.POPUP_EDIT_DATA_SHOW,
            data: {id},
        });
    },

    /**
     * Действие: редактировать данные.
     * @param {String} newData - новые данные
     */
    submitEditDataPopUp(newData) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.POPUP_EDIT_DATA_SUBMIT,
            data: {newData},
        });
    },

    /**
     * Действие: скрыть popup редактирования данных.
     */
    hideEditDataPopUp() {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.POPUP_HIDE,
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
     * Действие: Отобразить popup добавления банковской карты.
     */
    showAddCardPopUp() {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.POPUP_ADD_CARD_SHOW,
        });
    },

    /**
     * Действие: добавить новую банковскую карту.
     * @param {Number} number - номер карты
     * @param {Date} date - дата
     * @param {number} code - код
     */
    submitAddCardPopUp(number, date, code) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.POPUP_ADD_CARD_SUBMIT,
            data: {
                number,
                date,
                code,
            },
        });
    },

    /**
     * Действие: Отобразить popup редактирования данных банковской карты.
     * @param {any} id
     */
    showEditCardPopUp(id) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.POPUP_EDIT_CARD_SHOW,
            data: {id},
        });
    },

    /**
     * Действие: редактировать данные банковской карты.
     * @param {Number} number - номер карты
     * @param {Date} date - дата
     * @param {number} code - код
     */
    submitEditCardPopUp(number, date, code) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.POPUP_EDIT_CARD_SUBMIT,
            data: {
                number,
                date,
                code,
            },
        });
    },

    /** Удаление банковской карты с определенным id.
     * @param {any} id
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
     * Действие: Отобразить popup добавления адреса.
     */
    showAddAddressPopUp() {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.POPUP_ADD_ADDRESS_SHOW,
        });
    },

    /**
     * Действие: добавить новый адрес.
     * @param {String} city - город
     * @param {String} street - улица
     * @param {String} house - дом
     */
    submitAddAddressPopUp(city, street, house) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.POPUP_ADD_ADDRESS_SUBMIT,
            data: {
                city,
                street,
                house,
            },
        });
    },

    /**
     * Действие: Отобразить popup редактирования адреса.
     * @param {any} id
     */
    showEditAddressPopUp(id) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.POPUP_EDIT_ADDRESS_SHOW,
            data: {id},
        });
    },

    /**
     * Действие: редактировать адрес.
     * @param {String} city - город
     * @param {String} street - улица
     * @param {String} house - дом
     */
    submitEditAddressPopUp(city, street, house) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.POPUP_EDIT_ADDRESS_SUBMIT,
            data: {
                city,
                street,
                house,
            },
        });
    },

    /** Удаление адреса с определенным id.
     * @param {any} id
     */
    deleteAddress(id) {
        Dispatcher.dispatch({
            actionName: ItemCardsActionTypes.DELETE_ADDRESS,
            data: {id},
        });
    },
};
