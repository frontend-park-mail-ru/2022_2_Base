import orderBlockTemplate from './OrderBlock.hbs';
import BaseComponent from '../BaseComponent';
import './OrderBlock.scss';
import {orderAction, OrderActionTypes} from '../../actions/order';
import ordersStore from '../../stores/OrdersStore';
import {config} from '../../config';
import errorMessage from '../../modules/ErrorMessage';

/**
 * Класс для реализации компонента OrderBlock
 */
export default class OrderBlock extends BaseComponent {
    ordersBlock: HTMLElement | null;

    /**
     * Конструктор, создающий класс компонента OrderBlock
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent);

        this.ordersBlock = null;
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        ordersStore.addListener(this.cancelOrderListener, OrderActionTypes.CANCEL_ORDER);
    }

    /**
     * Функция, добавляющий слушатели.
     */
    cancelOrderListener() {
        switch (ordersStore.getContext(ordersStore._storeNames.responseCode)) {
        case config.responseCodes.code200: {
            const orderStatusElement = document.getElementById(
                `order-status/${
                    ordersStore.getContext(ordersStore._storeNames.cancelElementID)}`);
            if (orderStatusElement) {
                orderStatusElement.textContent = 'отменен';
            }
            errorMessage.getAbsoluteNotificationMessage('Заказ успешно отменен');
        }
            break;
        default:
            errorMessage.getAbsoluteErrorMessage('Ошибка при отмене заказа');
        }
    }

    /**
     * Функция, добавляющий слушатели.
     * @param target - элемент, на который нажали
     */
    cancelOrderButtonClickHandler({target}: Event) {
        if (target instanceof HTMLElement &&
            target.getAttribute('data-id')) {
            orderAction.cancelOrder(Number(target.id));
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        this.ordersBlock = document.getElementById('orders-page__header');
        if (this.ordersBlock) {
            this.ordersBlock.addEventListener('click', this.cancelOrderButtonClickHandler);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
        if (this.ordersBlock) {
            this.ordersBlock.removeEventListener('click', this.cancelOrderButtonClickHandler);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param context - контекст отрисовки шаблона
     */
    override render(context: object) {
        super.render(super.prepareCategory(context), orderBlockTemplate, 'afterend');
        this.addListener();
        this.startEventListener();
    }
}
