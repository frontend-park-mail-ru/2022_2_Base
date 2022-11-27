import PopUpAddPaymentCard from '../../popUp/PopUpAddPaymentCard/PopUpAddPaymentCard';
import PaymentCardTemplate from './paymentCard.hbs';
import './PaymentCard.scss';
import userStore from '../../../stores/UserStore';
import BaseInfoCard from '../BaseInfoCard';
import {profileAction} from '../../../actions/profile';

/**
 * Класс для реализации компонента PaymentCard
 */
export default class PaymentCard extends BaseInfoCard {
    /**
     * Конструктор, создающий класс компонента PaymentCard
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        const popup = document.getElementById('popUp_user-page');
        const popupClass = new PopUpAddPaymentCard(popup);

        super(parent,
            [popup,
                document.getElementById('popUp-fade_user-page'),
                userStore._storeNames.address,
                popupClass,
                PaymentCardTemplate,
                'payment-card']);
    }

    /**
     * Функция для передачи в слушателе click на значок удаления
     * адреса
     * @param {object} event - событие
     */
    listenClickDelete(event) {
        profileAction.deleteCard(Number(event.target.id.replace('delete-img-paymentCard/', '')));
    }
}
