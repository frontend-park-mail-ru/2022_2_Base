import PopUpAddPaymentCard from '../../popUp/PopUpAddPaymentCard/PopUpAddPaymentCard';
import PaymentCardTemplate from './paymentCard.hbs';
import './PaymentCard.scss';
import userStore from '../../../stores/UserStore';
import BaseInfoCard from '../BaseInfoCard';
import {profileAction} from '../../../actions/profile';
import {config} from '../../../config';

/**
 * Класс для реализации компонента PaymentCard
 */
export default class PaymentCard extends BaseInfoCard {
    /**
     * Конструктор, создающий класс компонента PaymentCard
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        const popup = document.getElementById('popUp_user-page');
        const fadePopup = document.getElementById('popUp-fade_user-page');
        if (fadePopup && popup) {
            const popupClass = new PopUpAddPaymentCard(popup);
            super(parent,
                [
                    popup,
                    fadePopup,
                    userStore._storeNames.address,
                    popupClass,
                    PaymentCardTemplate,
                    'payment-card',
                ]);
        } else {
            const popupClass = new PopUpAddPaymentCard(config.empyNode);
            super(parent,
                [
                    config.empyNode,
                    config.empyNode,
                    userStore._storeNames.address,
                    popupClass,
                    PaymentCardTemplate,
                    '',
                ]);
        }
    }

    /**
     * Функция для передачи в слушателе click на значок удаления
     * адреса
     * @param event - событие
     */
    override async listenClickDelete(event: Event) {
        if (event.target instanceof HTMLElement) {
            profileAction.deleteCard(Number(event.target.id.replace('delete-img-paymentCard/', '')));
        }
    }
}
