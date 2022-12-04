import ordersPageTemplate from './OrdersPage.hbs';
import BasePage from '../BasePage.js';
import './OrdersPage.scss';
import OrderBlock from '../../components/OrderBlock/OrderBlock.js';
import {orderAction, OrderActionTypes} from '../../actions/order';
import ordersStore from '../../stores/OrdersStore';
import {config} from '../../config';
import errorMessage from '../../modules/ErrorMessage';
import refreshElements from '../../modules/refreshElements';
import itemsStore from '../../stores/ItemsStore';

/**
 * Класс, реализующий страницу OrdersPage
 */
export default class OrdersPage extends BasePage {
    /**
     * Конструктор, создающий конструктор страницы OrdersPage с нужными параметрами
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
            if (ordersStore.getContext(ordersStore._storeNames.orders).length) {
                this.orderBlock.render(ordersStore.getContext(ordersStore._storeNames.orders));
            } else {
                refreshElements.showUnAuthPage({
                    text: 'Пока у вас нет заказов. Может купите',
                    linkToPage:
                        itemsStore.getContext(itemsStore._storeNames.topCategory.Smartphone.href),
                    linkText: 'телефон',
                    textAfterLink: '.',
                });
            }
            break;
        case config.responseCodes.code401:
            refreshElements.showUnAuthPage({
                text: 'Чтобы посмотреть заказы',
                linkToPage: config.href.login,
                linkText: 'авторизуйтесь',
                textAfterLink: '.',
            });
            break;
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при загрузке заказов');
            break;
        }
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render(config) {
        super.render(config);
        this.orderBlock = new OrderBlock(document.getElementById('orders-page__header'));
        orderAction.getOrders();
    }
}
