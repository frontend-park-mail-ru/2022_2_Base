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
    SAVE_ADD_CARD: 'SAVE_ADD_CARD',
    DELETE_CARD: 'DELETE_CARD',
    SAVE_ADD_ADDRESS: 'SAVE_ADD_ADDRESS',
    SAVE_EDIT_ADDRESS: 'SAVE_EDIT_ADDRESS',
    DELETE_ADDRESS: 'DELETE_ADDRESS',
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
     * Действие: добавить новую банковскую карту.
     * @param {object} data - данные для обработки
     */
    saveAddCard(data) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.SAVE_ADD_CARD,
            data: data,
        });
    },

    /** Удаление банковской карты с определенным id.
     * @param {number} id
     */
    deleteCard(id) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.DELETE_CARD,
            data: id,
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
     * @param {int} id
     */
    deleteAddress(id) {
        Dispatcher.dispatch({
            actionName: ProfileActionTypes.DELETE_ADDRESS,
            data: id,
        });
    },
};
