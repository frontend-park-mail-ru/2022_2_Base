import CommentPagePageTemplate from './CommentPage.hbs';
import './CommentPage.scss';
import Comment from '../../../components/Comment/Comment.js';
import {itemCardsAction, ItemCardsActionTypes} from '../../../actions/itemCards';
import BaseItemPage from '../BaseItemPage';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class CommentPage extends BaseItemPage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            CommentPagePageTemplate,
            [itemCardsAction.getItemCard, ItemCardsActionTypes.ITEM_CARD_GET,
                'comment'],
        );
    }

    /**
     * Функция, загружающая дополнительные данные
     * @param {object} data объект для добавления данных
     */
    loadMoreData(data) {
        const comments = new Comment(document.getElementById('comments'));
        comments.render(data.comments);
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        super.addListener();
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
    }
}
