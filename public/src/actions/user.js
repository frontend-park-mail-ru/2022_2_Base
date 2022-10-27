'use strict';

import Dispatcher from '../modules/dispatcher.js';

/**
 * Константа, содержащая в себе типы действий.
 */
export const UserActionTypes = {
    USER_FETCH: 'USER_FETCH',
    USER_REGISTER: 'USER_REGISTER',
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGOUT: 'USER_LOGOUT',
};

/**
 * Класс, содержащий в себе действия в системе.
 */
export const userActions = {
    /**
     * Действие: инициализация пользователя.
     */
    fetchUser() {
        Dispatcher.dispatch({
            actionName: UserActionTypes.USER_FETCH,
        });
    },

    /**
     * Действие: регистрация пользователя.
     * @param {String} name
     * @param {String} email
     * @param {String} password
     * @param {String} repeatPassword
     */
    register(name, email, password, repeatPassword) {
        Dispatcher.dispatch({
            actionName: UserActionTypes.USER_REGISTER,
            data: {
                name,
                email,
                password,
                repeatPassword,
            },
        });
    },

    /**
     * Действие: вход пользователя.
     * @param {String} email
     * @param {String} password
     */
    login(email, password) {
        Dispatcher.dispatch({
            actionName: UserActionTypes.USER_LOGIN,
            data: {
                email,
                password,
            },
        });
    },

    /**
     * Действие: выход из аккаунта пользователя.
     */
    logout() {
        Dispatcher.dispatch({
            actionName: UserActionTypes.USER_LOGOUT,
        });
    },

};