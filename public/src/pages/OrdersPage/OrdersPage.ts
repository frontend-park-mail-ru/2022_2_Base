import ordersPageTemplate from './OrdersPage.hbs';
import BasePage from '../BasePage';
import './OrdersPage.scss';
import OrderBlock from '../../components/OrderBlock/OrderBlock';
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
    orderBlock: OrderBlock | undefined;
    /**
     * Конструктор, создающий конструктор страницы OrdersPage с нужными параметрами
     * @param parent - HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(
            parent,
            ordersPageTemplate,
        );
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    override addListener() {
        ordersStore.addListener(this.renderCards.bind(this), OrderActionTypes.GET_ORDERS);
    }

    /**
     * Метод, отрисовывающий карточки заказов.
     */
    renderCards() {
        switch (ordersStore.getContext(ordersStore._storeNames.responseCode)) {
        case config.responseCodes.code200:
            if (ordersStore.getContext(ordersStore._storeNames.orders).length >= 1) {
                this.orderBlock?.render(ordersStore.getContext(ordersStore._storeNames.orders));
            } else {
                refreshElements.showUnAuthPage({
                    text: 'Пока у вас нет заказов. Может купите',
                    linkToPage: itemsStore.
                        getContext((itemsStore._storeNames.topCategory as any).Smartphone.href),
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
     * @param config - контекст отрисовки страницы
     */
    override render(config: object) {
        super.render(config);
        const ordersHeader = document.getElementById('orders-page__header');
        if (ordersHeader) {
            this.orderBlock = new OrderBlock(ordersHeader);
            orderAction.getOrders();
        }
    }
}
