'use strict';

import Dispatcher from '../modules/dispatcher.js';

/**
 * Константа, содержащая в себе типы действий с лайками.
 */
export const LikesActionTypes = {
    LIKE: 'LIKE',
    DISLIKE: 'DISLIKE',
    GET_NUMBER_OF_LIKES: 'GET_NUMBER_OF_LIKES',
};

/**
 * Класс, содержащий в себе действия с лайками.
 */
export const LikesAction = {
    /**
     * Действие: лайкнуть карточку.
     * @param {any} id
     */
    like(id) {
        Dispatcher.dispatch({
            actionName: LikesActionTypes.LIKE,
            data: {id},
        });
    },

    /**
     * Действие: дизлайкнуть карточку.
     * @param {any} id
     */
    dislike(id) {
        Dispatcher.dispatch({
            actionName: LikesActionTypes.DISLIKE,
            data: {id},
        });
    },

    /**
     * Действие: запрос количества лайков карточки товара.
     * @param {any} id
     */
    get_number_of_likes(id) {
        Dispatcher.dispatch({
            actionName: LikesActionTypes.GET_NUMBER_OF_LIKES,
            data: {id},
        });
    },
};
