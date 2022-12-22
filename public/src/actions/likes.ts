'use strict';

import Dispatcher from '../modules/dispatcher';

/**
 * Константа, содержащая в себе типы действий с лайками.
 */
export const LikesActionTypes = {
    LIKE: 'LIKE',
    DISLIKE: 'DISLIKE',
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
            data: id,
        });
    },

    /**
     * Действие: дизлайкнуть карточку.
     * @param id - идентификатор
     */
    dislike(id: number) {
        Dispatcher.dispatch({
            actionName: LikesActionTypes.DISLIKE,
            data: id,
        });
    },
};
