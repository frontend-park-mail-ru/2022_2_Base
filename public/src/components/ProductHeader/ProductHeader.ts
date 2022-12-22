import ProductHeaderTemplate from './ProductHeader.hbs';
import BaseComponent from '../BaseComponent';
import './ProductHeader.scss';
import {config} from '../../config';
import {_declension} from '../../modules/sharedFunctions';
import {likesAction, LikesActionTypes} from '../../actions/likes';
import itemsStore from '../../stores/ItemsStore';
import errorMessage from '../../modules/ErrorMessage';
import userStore from '../../stores/UserStore';

/**
 * Класс для реализации компонента ProductHeader
 */
export default class ProductHeader extends BaseComponent {
    likeButton: HTMLElement | null;

    /**
     * Конструктор, создающий класс компонента ProductHeader
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent);

        this.likeButton = null;
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        itemsStore.addListener(this.listenLike,
            LikesActionTypes.LIKE,
        );

        itemsStore.addListener(this.listenLike,
            LikesActionTypes.DISLIKE,
        );
    }

    /**
     * Функция, реагирует на ответ сервера при лайке
     */
    listenLike() {
        switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            break;
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при изменении избранного');
        }
    }

    /**
     * Функция, реагирующая на нажатие кнопки лайка.
     * @param event - событие, вызвавшее обработчик
     */
    listenClickFavourite(event: Event) {
        if (event.target instanceof HTMLInputElement &&
            userStore.getContext(userStore._storeNames.isAuth)) {
            event.target.checked ?
                likesAction.like(
                    Number(itemsStore.getContext(itemsStore._storeNames.itemData).id)) :
                likesAction.dislike(
                    Number(itemsStore.getContext(itemsStore._storeNames.itemData).id));
        } else {
            event.preventDefault();
            errorMessage.
                getAbsoluteNotificationMessage(
                    'Чтобы добавить в избранное войдите');
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        this.likeButton = document.getElementById('favourite-opt_cart');
        if (this.likeButton) {
            this.likeButton.addEventListener('click', this.listenClickFavourite);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
        if (this.likeButton) {
            this.likeButton.removeEventListener('click', this.listenClickFavourite);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону и контексту
     * @param context - контекст отрисовки шаблона
     */
    override render(context: productObj) {
        super.render(this.prepareRenderData(context), ProductHeaderTemplate);
        this.startEventListener();
        this.addListener();
    }

    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param context - контекст отрисовки шаблона
     * @returns наполнение для формы
     */
    prepareRenderData(context: productObj) {
        return {
            itemPath: config.href.product + '/' + context.id,
            commentPath: config.href.comment + '/' + context.id,
            categoryPath: config.href.category + '/' + context.category,
            categoryName: 'Категория',
            name: context.name,
            rating: context.rating,
            commentsCount: context.commentscount,
            commentsCountText:
                _declension(context.commentscount, ['отзыв', 'отзыва', 'отзывов']),
            favourite: context.favourite,
        };
    }
}
