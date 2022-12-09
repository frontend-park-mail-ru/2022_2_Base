'use strict';

import Dispatcher from '../modules/dispatcher';

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
     * @param data - данные для регистрации
     */
    signup(data: object) {
        Dispatcher.dispatch({
            actionName: UserActionTypes.USER_REGISTER,
            data,
        });
    },

    /**
     * Действие: вход пользователя.
     * @param data - данные для входа
     */
    login(data: object) {
        Dispatcher.dispatch({
            actionName: UserActionTypes.USER_LOGIN,
            data,
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
