import addCommentPageTemplate from './AddCommentPage.hbs';
import './AddCommentPage.scss';
import itemsStore from '../../../stores/ItemsStore';
import {config} from '../../../config';
import errorMessage from '../../../modules/ErrorMessage';
import router from '../../../modules/Router';
import {itemCardsAction, ItemCardsActionTypes} from '../../../actions/itemCards';
import BaseItemPage from '../BaseItemPage';
import userStore from '../../../stores/UserStore';
import refreshElements from '../../../modules/refreshElements';

/**
 * Класс, реализующий AddCommentPage
 */
export default class AddCommentPage extends BaseItemPage {
    submitButton: HTMLElement | null;
    /**
     * Конструктор, создающий конструктор базовой страницы AddCommentPage с нужными параметрами
     * @param parent - HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(
            parent,
            addCommentPageTemplate,
            [itemCardsAction.getItemCard, ItemCardsActionTypes.ITEM_CARD_GET,
                'comment'],
        );

        this.submitButton = null;
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    override addListener() {
        super.addListener();

        itemsStore.addListener(this.listenCommentAdd, ItemCardsActionTypes.ADD_COMMENT);
    }

    /**
     * Функция, реагирующую на добавление отзыва
     */
    listenCommentAdd() {
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            router.openPage(config.href.comment + '/' + location.pathname.split('/').pop());
            break;
        case config.responseCodes.code401:
            errorMessage.getAbsoluteErrorMessage('Вы не авторизированны');
            break;
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при создании отзыва');
            break;
        }
    }

    /**
     * Функция, регистрирующая на нажатие кнопки создания отзыва
     */
    listenClickSubmitComment() {
        const commentData: commentObj = {
            userid: config.states.noPayCardId,
            itemid: config.states.noPayCardId,
            rating: config.states.noPayCardId,
            pros: config.states.noAvatar,
            cons: config.states.noAvatar,
            comment: config.states.noAvatar,
        };
        const rating = document.getElementsByName('rating');
        if (rating) {
            commentData.rating = Math.abs((Array.from(rating) as Array<HTMLInputElement>)
                .findIndex(({checked}) => checked) - 5);

            if (commentData.rating !== 6) {
                const pros = document.getElementById('textarea_pros-filed');
                const cons = document.getElementById('textarea_cons-filed');
                const comment = document.getElementById('textarea_comment-filed');
                if (pros instanceof HTMLTextAreaElement) {
                    commentData.pros = pros.value;
                }
                if (cons instanceof HTMLTextAreaElement) {
                    commentData.cons = cons.value;
                }
                if (comment instanceof HTMLTextAreaElement) {
                    commentData.comment = comment.value;
                }
                itemCardsAction.addComment(commentData);
            } else {
                errorMessage.getAbsoluteErrorMessage('Укажите рейтинг товара');
            }
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    override startEventListener() {
        this.submitButton = document.getElementById('add-comment-page__submit');
        if (this.submitButton) {
            this.submitButton.addEventListener('click', this.listenClickSubmitComment);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
        if (this.submitButton) {
            this.submitButton.removeEventListener('click', this.listenClickSubmitComment);
        }
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    override render() {
        if (userStore.getContext(userStore._storeNames.isAuth)) {
            super.render();
        } else {
            refreshElements.showUnAuthPage({
                text: 'Чтобы написать отзыв',
                linkToPage: config.href.login,
                linkText: 'войдите',
                textAfterLink: '&nbspв аккаунт',
            });
        }
    }
}
