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
 * Класс, реализующий главную страницу
 */
export default class AddCommentPage extends BaseItemPage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            addCommentPageTemplate,
            [itemCardsAction.getItemCard, ItemCardsActionTypes.ITEM_CARD_GET,
                'comment'],
        );
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
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
        const commentData = {};
        commentData.rating = Math.abs(Array.from(document.getElementsByName('rating'))
            .findIndex(({checked}) => checked === true) - 5);

        if (commentData.rating !== 6) {
            commentData.pros = document.getElementById('textarea_pros-filed').value;
            commentData.cons = document.getElementById('textarea_cons-filed').value;
            commentData.comment = document.getElementById('textarea_comment-filed').value;
            itemCardsAction.addComment(commentData);
        } else {
            errorMessage.getAbsoluteErrorMessage('Укажите рейтинг товара');
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        this.submitButton = document.getElementById('add-comment-page__submit');
        if (this.submitButton) {
            this.submitButton.addEventListener('click', this.listenClickSubmitComment);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        if (this.submitButton) {
            this.submitButton.removeEventListener('click', this.listenClickSubmitComment);
        }
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    render() {
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
