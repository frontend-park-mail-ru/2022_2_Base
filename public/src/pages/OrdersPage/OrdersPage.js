import ordersPageTemplate from './OrdersPage.hbs';
import BasePage from '../BasePage.js';
import './OrdersPage.scss';
import OrderBlock from '../../components/OrderBlock/OrderBlock.js';
import {orderAction, OrderActionTypes} from '../../actions/order';
import ordersStore from '../../stores/OrdersStore';
import {config} from '../../config';
import errorMessage from '../../modules/ErrorMessage';

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
        switch (ordersStore.getContext(ordersStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            this.orderBlock = new OrderBlock(document.getElementById('orders-page__block'));
            this.orderBlock.render(ordersStore.getContext(ordersStore._storeNames.orders));
            break;
        case config.responseCodes.code401:
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при загрузке заказов: нет авторизации');
            break;
        }
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
