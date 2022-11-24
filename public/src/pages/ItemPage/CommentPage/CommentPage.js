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
        // itemsStore.addListener(this.loadItem,
        //     ItemCardsActionTypes.ITEM_CARD_GET);
        //
        // cartStore.addListener(this.getCart, CartActionTypes.GET_CART);
    }

    // /**
    //  * Функция, реагирующая на получение товаров из корзины
    //  */
    // getCart() {
    //     console.log('asdasda');
    //     switch (cartStore.getContext(itemsStore._storeNames.responseCode)) {
    //     case config.responseCodes.code200:
    //     case config.responseCodes.code401:
    //         itemCardsAction.getItemCard();
    //         break;
    //     default:
    //         itemCardsAction.getItemCard(); // fix
    //         errorMessage.getAbsoluteErrorMessage('Ошибка при получении товаров из корзины');
    //         break;
    //     }
    // }
    //
    // /**
    //  * Функция, подгружающая и отрисовывающая карточки товаров
    //  */
    // loadItem() {
    //     switch (itemsStore.getContext(itemsStore._storeNames.responseCode)) {
    //     case config.responseCodes.code200:
    //         const data = itemsStore.getContext(itemsStore._storeNames.itemData);
    //         if (data) {
    //             super.render(data);
    //             const comments = new Comment(document.getElementById('comments'));
    //             comments.render(data.comments);
    //             const pageProduct = new ProductHeader(
    //                 document.getElementById('comment-page__header-product'));
    //             pageProduct.render(data);
    //             const addToCartButton = new AddToCartButton(
    //                 document.getElementById('comment-block-button-add-to-cart'));
    //             addToCartButton.render(data);
    //         } else {
    //             router.openNotFoundPage();
    //         }
    //         break;
    //     default:
    //         router.openNotFoundPage();
    //         break;
    //     }
    // }

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
    // /**
    //  * Метод, отрисовывающий страницу.
    //  * @param {object} config контекст отрисовки страницы
    //  */
    // render() {
    //     this.addListener();
    //     cartAction.getCart();
    //     /* const data = {
    //         id: 1,
    //         name: 'Планшет Apple iPad 10.2 2021, 64 ГБ, Wi-Fi, серебристый',
    //         rating: '5.0',
    //         commentsHref: '',
    //         commentsCount: 1,
    //         favourite: false,
    //         photo: './img/ipad.png',
    //         price: '35 890',
    //         salePrice: '31 580',
    //         discount: 12,
    //         amount: 2,
    //         comments: [
    //             {
    //                 id: 1,
    //                 userName: 'Имя Пользователя',
    //                 userPhoto: './img/UserPhoto.png',
    //                 dignity: 'Цена',
    //                 limitations: 'нет',
    //                 comment: `Что сказать об iPad кроме того, что это лучший планшет?
    //                     Ничего) Выбирайте только размеры. Никогда не брал с сим-картой их,
    //                     потому что цепляется или к Wi-Fi или через подключение к iPhone в
    //                     режиме модема.`,
    //                 likeCount: 30,
    //                 dislikeCount: 3,
    //                 date: '18 / 11 / 2022',
    //                 rating: 5,
    //             },
    //             {
    //                 id: 2,
    //                 userName: 'Имя Пользователя',
    //                 userPhoto: './img/UserPhoto.png',
    //                 dignity: 'Цена',
    //                 limitations: 'нет',
    //                 comment: `Что сказать об iPad кроме того, что это лучший планшет?
    //                     Ничего) Выбирайте только размеры. Никогда не брал с сим-картой их,
    //                     потому что цепляется или к Wi-Fi или через подключение к iPhone в
    //                     режиме модема.`,
    //                 likeCount: 30,
    //                 dislikeCount: 3,
    //                 date: '18 / 11 / 2022',
    //                 rating: 5,
    //             },
    //             // {
    //             //     userName: 'Имя Пользователя',
    //             //     userPhoto: './img/UserPhoto.png',
    //             //     dignity: 'Цена',
    //             //     limitations: 'нет',
    //             //     comment: `Что сказать об iPad кроме того, что это лучший планшет?
    //             //         Ничего) Выбирайте только размеры. Никогда не брал с сим-картой их,
    //             //         потому что цепляется или к Wi-Fi или через подключение к iPhone в
    //             //         режиме модема.`,
    //             //     likeCount: 30,
    //             //     dislikeCount: 3,
    //             //     date: '18 / 11 / 2022',
    //             //     rating: 5,
    //             // },
    //         ],
    //     };*/
    // }
}
