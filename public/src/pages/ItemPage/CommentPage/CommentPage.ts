import CommentPagePageTemplate from './CommentPage.hbs';
import './CommentPage.scss';
import Comment from '../../../components/Comment/Comment';
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
    createOrderButton: any;
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param parent - HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(
            parent,
            CommentPagePageTemplate,
            [itemCardsAction.getItemCard, ItemCardsActionTypes.ITEM_CARD_GET,
                'comment'],
        );
    }

    /**
     * Функция, загружающая дополнительные данные
     */
    override loadMoreData() {
        itemCardsAction.getComments();
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    override addListener() {
        super.addListener();
        itemsStore.addListener(this.listenCommentsLoad, ItemCardsActionTypes.GET_COMMENTS);
    }

    /**
     * Функция, регистрирующая на загрузку комментариев
     */
    listenCommentsLoad() {
        const commentElement = document.getElementById('comments');
        if (commentElement) {
            const comments = new Comment(commentElement);
            comments.render(itemsStore.getContext(itemsStore._storeNames.comments)
                .map((comment: any) => {
                    comment[`rating${comment.rating}`] = true;
                    return comment;
                }));
        }
    }

    /**
     * Функция, реагирующая на нажатие кнопки создания заказа
     */
    listenAddCommentButton() {
        if (itemsStore.getContext(itemsStore._storeNames.comments)
            .find((comment: any) =>
                comment.userid === cartStore.getContext(cartStore._storeNames.userID))) {
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
    override startEventListener() {
        this.createOrderButton = document.getElementById('add-comment-btn');
        if (this.createOrderButton) {
            this.createOrderButton.addEventListener('click', this.listenAddCommentButton);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
        if (this.createOrderButton) {
            this.createOrderButton.removeEventListener('click', this.listenAddCommentButton);
        }
    }
}
