import addCommentPageTemplate from './AddCommentPage.hbs';
import './AddCommentPage.scss';
import itemsStore from '../../../stores/ItemsStore';
import {config} from '../../../config';
import errorMessage from '../../../modules/ErrorMessage';
import router from '../../../modules/Router';
import {itemCardsAction, ItemCardsActionTypes} from '../../../actions/itemCards';
import BaseItemPage from '../BaseItemPage';

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
        // this.inputRegEx = /[^A-Za-z0-9.? ,:;!]+/g;
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
        console.log('asdasdasdas');
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
        console.log('listenClickSubmitComment');
        const commentData = {};
        commentData.rating = Math.abs(Array.from(document.getElementsByName('rating'))
            .findIndex(({checked}) => checked === true) - 5);

        if (commentData.rating !== 6) {
            commentData.worths = document.getElementById('textarea_pros-filed').value;
            commentData.drawbacks = document.getElementById('textarea_cons-filed').value;
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
    //
    // /**
    //  * Метод, отрисовывающий страницу.
    //  */
    // render() {
    //     super.render();
    //     // userStrore.getContext(userStrore._storeNames.isAuth) ? super.render() :
    //     //     refreshElements.showUnAuthPage({
    //     //         text: 'Чтобы написать отзыв нужно',
    //     //         linkToPage: config.href.login,
    //     //         linkText: 'войти',
    //     //         textAfterLink: '&nbspв свой профиль',
    //     //     });
    // }
}
