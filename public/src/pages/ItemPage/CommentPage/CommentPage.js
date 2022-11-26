import CommentPagePageTemplate from './CommentPage.hbs';
import './CommentPage.scss';
import Comment from '../../../components/Comment/Comment.js';
import {itemCardsAction, ItemCardsActionTypes} from '../../../actions/itemCards';
import BaseItemPage from '../BaseItemPage';
import itemsStore from '../../../stores/ItemsStore';

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
        itemCardsAction.getComments();
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        super.addListener();
        itemsStore.addListener(this.listenCommentsLoad, ItemCardsActionTypes.GET_COMMENTS);
    }

    /**
     * Функция, регистрирующая на загрузку комментариев
     */
    listenCommentsLoad() {
        const comments = new Comment(document.getElementById('comments'));
        comments.render(itemsStore.getContext(itemsStore._storeNames.comments).map((comment) => {
            comment[`rating${comment.rating}`] = true;
            return comment;
        }));
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
