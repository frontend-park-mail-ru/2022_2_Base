import CommentPagePageTemplate from './CommentPage.hbs';
import BasePage from '../BasePage.js';
import './CommentPage.scss';
import Comment from '../../components/Comment/Comment.js';
import ProductHeader from '../../components/ProductHeader/ProductHeader';
import cartStore from '../../stores/CartStore.js';
import {cartAction, CartActionTypes} from '../../actions/cart.js';

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
     * Функция, регистрирующая листенеры сторов
     */
         addListener() {
            cartStore.addListener(this.buttonCreate,
                CartActionTypes.ADD_TO_CART);
    
            cartStore.addListener(this.buttonAdd,
                CartActionTypes.INCREASE_NUMBER,
            );
    
            cartStore.addListener(this.buttonMinus,
                CartActionTypes.DECREASE_NUMBER,
            );
        }
    
        /**
         * Функция, увеличение количество
         */
        buttonCreate() {
            const addToCartButton = document.getElementById(
                `comment_button-add-to-cart/${cartStore.getContext(cartStore._storeNames.currID)}`);
            const amountSelector = document.getElementById(
                `comment_amount-selector/${cartStore.getContext(cartStore._storeNames.currID)}`);
            if (!!addToCartButton && !!amountSelector) {
                amountSelector.style.display = 'grid';
                addToCartButton.style.display = 'none';
    
                const amount = document.getElementById(
                    `comment-amount/${cartStore.getContext(cartStore._storeNames.currID)}`);
                if (amount) {
                    amount.textContent = '1';
                }
            } else {
                console.warn('Элементы не найдены');
            }
        }
    
        /**
         * Функция для увеличения количества товара в корзине
         */
        buttonAdd() {
            const amount = document.getElementById(
                `comment-amount/${cartStore.getContext(cartStore._storeNames.currID)}`);
            if (amount) {
                const count = parseInt(amount.textContent);
                amount.textContent = (count + 1).toString();
            }
        }
    
        /**
         * Функция для уменьшения количества товара в корзине
         */
        buttonMinus() {
            const amount = document.getElementById(
                `comment-amount/${cartStore.getContext(cartStore._storeNames.currID)}`);
            if (amount) {
                const count = parseInt(amount.textContent);
    
                if (count === 1) {
                    const amountSelector = document.getElementById(
                        `comment_amount-selector/${cartStore.getContext(cartStore._storeNames.currID)}`);
                    const addToCartButton = document.getElementById(
                        `comment_button-add-to-cart/${cartStore.getContext(cartStore._storeNames.currID)}`);
                    if (!!addToCartButton && !!amountSelector) {
                        amountSelector.style.display = 'none';
                        addToCartButton.style.display = 'flex';
                    } else {
                        console.warn(
                            'Элементы не найдены: addToCartButton, addToCartButton');
                    }
                } else {
                    amount.textContent = (count - 1).toString();
                }
            }
        }
    
    
        /**
         * Функция, обрабатывающая клики на кнопку добавить в корзину
         * @param {Event} event контекст события для обработки
         */
        listenClickButtonAddIntoCart(event) {
            event.preventDefault();
            const target = event.target;
            let elementId = target.id;
            let itemId;
            if (elementId) {
                if (elementId.includes('/')) {
                    [elementId, itemId] = elementId.split('/');
                    switch (elementId) {
                    case 'comment_button-add-to-cart':
                        this.buttonCreate(); // убрать
                        cartAction.addToCart(itemId);
                        break;
                    case 'comment_button-minus_cart':
                        this.buttonMinus(); // убрать
                        cartAction.decreaseNumber(itemId);
                        break;
                    case 'comment_button-plus_cart':
                        this.buttonAdd(); // убрать
                        cartAction.increaseNumber(itemId);
                        break;
                    }
                }
            }
        }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        const buttonAddIntoCart = document.getElementById('comment-block-button-add-to-cart');
        if (buttonAddIntoCart) {
            buttonAddIntoCart.addEventListener('click', this.listenClickButtonAddIntoCart.bind(this));
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const buttonAddIntoCart = document.getElementById('comment-block-button-add-to-cart');
        if (buttonAddIntoCart) {
            buttonAddIntoCart.removeEventListener('click', this.listenClickButtonAddIntoCart);
        }
    }
    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render(config) {
        const data = {
            id: 1,
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
        this.startEventListener();
    }
}
