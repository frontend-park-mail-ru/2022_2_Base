import ordersPageTemplate from './OrdersPage.hbs';
import BasePage from '../BasePage.js';
import './OrdersPage.scss';
import OrderBlock from '../../components/OrderBlock/OrderBlock.js';
import {orderAction, OrderActionTypes} from '../../actions/order';
import ordersStore from '../../stores/OrdersStore';

/**
 * Класс, реализующий главную страницу
 */
export default class OrdersPage extends BasePage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            ordersPageTemplate,
        );
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        ordersStore.addListener(this.loadCards.bind(this), OrderActionTypes.GET_ORDERS);
    }

    /**
     * Метод, загружающий карты.
     * @param {string} classToGet имя класса, в который надо вставить карту
     * @param {string} reqPath путь для api запроса к беку
     */
    loadCards(classToGet, reqPath) {
        ordersStore.getContext(ordersStore._storeNames.orders); // <- request data


        const rootElement = document.getElementById('orders-page__block');

        const blockElement = document.createElement('div');
        blockElement.id = `${classToGet}${String(1)}`;
        blockElement.classList.add('order-block');
        rootElement.before(blockElement);
        /* rendering card itself */
        torderStorehis.orderBlock = new OrderBlock(blockElement);

        this.orderBlock.render();
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render(config) {
        super.render(config);
        orderAction.getOrders();

        // this.loadCards('orderBlock'); // ???
        // зачем тебе что-то передавать в функцию?
        // проще через this в конструкторе прокинуть, если сильно надо, но тут вообще смысла не вижу, честно говоря. Поясни
    }
}
