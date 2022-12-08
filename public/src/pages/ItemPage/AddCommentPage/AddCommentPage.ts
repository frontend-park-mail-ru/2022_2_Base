// @ts-expect-error TS(2307): Cannot find module './AddCommentPage.hbs' or its c... Remove this comment to see the full error message
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
    submitButton: any;
    /**
     * Конструктор, создающий конструктор базовой страницы AddCommentPage с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent: any) {
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
        (commentData as any).rating = Math.abs(Array.from(document.getElementsByName('rating'))
    // @ts-expect-error TS(2339): Property 'checked' does not exist on type 'HTMLEle... Remove this comment to see the full error message
    .findIndex(({ checked }) => checked === true) - 5);

        if ((commentData as any).rating !== 6) {
            (commentData as any).pros = (document.getElementById('textarea_pros-filed') as any).value;
            (commentData as any).cons = (document.getElementById('textarea_cons-filed') as any).value;
            (commentData as any).comment = (document.getElementById('textarea_comment-filed') as any).value;
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
