'use strict';

import Dispatcher from '../modules/dispatcher.js';

/**
 * Константа, содержащая в себе типы действий для собыйтий от sw.
 */
export const ServiceWorkerTypes = {
    OFFLINE_MSG_SHOW: 'OFFLINE_MSG_SHOW',
    FULL_OFFLINE: 'FULL_OFFLINE',
    OFFLINE_MSG_HIDE: 'OFFLINE_MSG_HIDE',
};

/**
 * Класс, содержащий в себе действия для работы с sw.
 */
export const serviceWorkerActions = {

    /**
     * Отображает предупреждение об offline работе
     */
    showOfflineMessage() {
        Dispatcher.dispatch({
            actionName: ServiceWorkerTypes.OFFLINE_MSG_SHOW,
        });
    },

    /**
     * Отображает страницу при отсутствии интернета и кеша на запрос
     */
    fullOffline() {
        Dispatcher.dispatch({
            actionName: ServiceWorkerTypes.FULL_OFFLINE,
        });
    },

    /**
     * Скрывает предупреждение об offline работе
     */
    hideOfflineMessage() {
        Dispatcher.dispatch({
            actionName: ServiceWorkerTypes.OFFLINE_MSG_HIDE,
        });
    },
};
