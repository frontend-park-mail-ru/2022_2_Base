import CommentPagePageTemplate from './CommentPage.hbs';
import BasePage from '../BasePage.js';
import './CommentPage.scss';
import Comment from '../../components/Comment/Comment.js';
import ProductHeader from '../../components/ProductHeader/ProductHeader';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class CommentPage extends BasePage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            CommentPagePageTemplate,
        );
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
    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render(config) {
        const data = {
            name: 'Планшет Apple iPad 10.2 2021, 64 ГБ, Wi-Fi, серебристый',
            rating: '5.0',
            commentsHref: '',
            commentCount: 466,
            favourite: false,
            photo: './img/ipad.png',
            price: '35 890',
            salePrice: '31 580',
            discount: 12,
            comments: [
                {
                    id: 1,
                    userName: 'Имя Пользователя',
                    userPhoto: './img/UserPhoto.png',
                    dignity: 'Цена',
                    limitations: 'нет',
                    comment: `Что сказать об iPad кроме того, что это лучший планшет? 
                        Ничего) Выбирайте только размеры. Никогда не брал с сим-картой их, 
                        потому что цепляется или к Wi-Fi или через подключение к iPhone в 
                        режиме модема.`,
                    likeCount: 30,
                    dislikeCount: 3,
                    date: '18 / 11 / 2022',
                    rating: 5,
                },
                {
                    id: 2,
                    userName: 'Имя Пользователя',
                    userPhoto: './img/UserPhoto.png',
                    dignity: 'Цена',
                    limitations: 'нет',
                    comment: `Что сказать об iPad кроме того, что это лучший планшет? 
                        Ничего) Выбирайте только размеры. Никогда не брал с сим-картой их, 
                        потому что цепляется или к Wi-Fi или через подключение к iPhone в 
                        режиме модема.`,
                    likeCount: 30,
                    dislikeCount: 3,
                    date: '18 / 11 / 2022',
                    rating: 5,
                },
                // {
                //     userName: 'Имя Пользователя',
                //     userPhoto: './img/UserPhoto.png',
                //     dignity: 'Цена',
                //     limitations: 'нет',
                //     comment: `Что сказать об iPad кроме того, что это лучший планшет? 
                //         Ничего) Выбирайте только размеры. Никогда не брал с сим-картой их, 
                //         потому что цепляется или к Wi-Fi или через подключение к iPhone в 
                //         режиме модема.`,
                //     likeCount: 30,
                //     dislikeCount: 3,
                //     date: '18 / 11 / 2022',
                //     rating: 5,
                // },
            ],
        };
        super.render(data);
        const comments = new Comment(document.getElementById('comments'));
        comments.render(data.comments);
        const pageProduct = new ProductHeader(document.getElementById('comment-page__header-product'));
        pageProduct.render(data);
    }
}
