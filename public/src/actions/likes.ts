'use strict';

import Dispatcher from '../modules/dispatcher';

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
export const likesAction = {
    /**
     * Действие: лайкнуть карточку.
     * @param id - идентификатор
     */
    like(id: number) {
        Dispatcher.dispatch({
            actionName: LikesActionTypes.LIKE,
            data: {id},
        });
    },

    /**
     * Действие: дизлайкнуть карточку.
     * @param id - идентификатор
     */
    dislike(id: number) {
        Dispatcher.dispatch({
            actionName: LikesActionTypes.DISLIKE,
            data: {id},
        });
    },

    /**
     * Действие: запрос количества лайков карточки товара.
     * @param id - идентификатор
     */
    get_number_of_likes(id: number) {
        Dispatcher.dispatch({
            actionName: LikesActionTypes.GET_NUMBER_OF_LIKES,
            data: {id},
        });
    },
};
