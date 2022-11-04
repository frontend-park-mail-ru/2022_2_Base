import registerPageTemplate from './CartPage.hbs';
import BasePage from '../BasePage.js';
import CartItem from '../../components/CartItem/CartItem.js';
import request from '../../modules/ajax.js';
import validation from '../../modules/validation.js';
import errorMessage from '../../modules/ErrorMessage.js';
import router from '../../modules/Router.js';
import './CartPage.scss';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class CartOrderPage extends BasePage {
    #item = {
        item: {
            title: `Apple iPhone 13 64 ГБ \\r
            gladwehaveanunderstanding, fuck out the way
yeah, all your shit lame, I feel no pain, we" "\\eof`,
            img: './img/Smartphone.png',
            vendor: 'OOO-iPhones-RUS',
            favourite: true,
            amount: 55,
            price: 123213,
            salePrice: 11232,
            checked: true,
        },
    };

    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            registerPageTemplate,
        );
    }

    /**
     * Метод, удаляющий слушатели.
     * @param {any} context контекст данных для страницы
     */
    removeEventListener(context) {

    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render(config) {
        super.render(config);

        this.CartItem = new CartItem(document.getElementById('checkboxes_cart'));
        this.CartItem.render(this.#item);
    }
}
