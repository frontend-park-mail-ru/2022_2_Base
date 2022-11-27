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
        ordersStore.addListener(this.renderCards.bind(this), OrderActionTypes.GET_ORDERS);
    }

    /**
     * Метод, отрисовывающий карточки заказов.
     */
    renderCards() {
        this.orderBlock = new OrderBlock(document.getElementById('orders-page__block'));
        this.orderBlock.render(ordersStore.getContext(ordersStore._storeNames.orders));
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render(config) {
        super.render(config);
        orderAction.getOrders();
    }
}
