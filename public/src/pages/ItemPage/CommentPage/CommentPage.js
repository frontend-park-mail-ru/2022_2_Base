import CommentPagePageTemplate from './CommentPage.hbs';
import './CommentPage.scss';
import Comment from '../../../components/Comment/Comment.js';
import {itemCardsAction, ItemCardsActionTypes} from '../../../actions/itemCards';
import BaseItemPage from '../BaseItemPage';
import itemsStore from '../../../stores/ItemsStore';
import cartStore from '../../../stores/CartStore';
import errorMessage from '../../../modules/ErrorMessage';
import {config} from '../../../config';
import router from '../../../modules/Router';

/**
 * Класс, реализующий страницу CommentPage.
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
     * Функция, реагирующая на нажатие кнопки создания заказа
     */
    listenAddCommentButton() {
        if (itemsStore.getContext(itemsStore._storeNames.comments)
            .find((comment) => comment.id === cartStore.getContext(cartStore._storeNames.userID))) {
            errorMessage.getAbsoluteErrorMessage('Вы уже создали отзыв об этом товаре');
        } else {
            router.openPage(
                config.href.addComment +
                document.location.pathname.slice(
                    document.location.pathname.lastIndexOf('/'),
                    document.location.pathname.length,
                ));
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        this.createOrderButton = document.getElementById('add-comment-btn');
        if (this.createOrderButton) {
            this.createOrderButton.addEventListener('click', this.listenAddCommentButton);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        if (this.createOrderButton) {
            this.createOrderButton.removeEventListener('click', this.listenAddCommentButton);
        }
    }
}
