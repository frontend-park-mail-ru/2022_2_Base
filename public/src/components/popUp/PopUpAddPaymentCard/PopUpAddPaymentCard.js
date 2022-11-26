import PopUpAddPaymentCardTemplate from './PopUpAddPaymentCard.hbs';
import './PopUpAddPaymentCard.scss';
import {profileAction} from '../../../actions/profile';
import BasePopUp from '../BasePopUp';

/**
 * Класс для реализации компонента Footer
 */
export default class PopUpAddPaymentCard extends BasePopUp {
    /**
     * Конструктор, создающий класс компонента PopUpAddPaymentCard
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent, [PopUpAddPaymentCardTemplate, 'add-card']);
    }

    /**
     * Функция для передачи в слушателе click на сохранение новых данных.
     * @param {object} event - событие
     */
    async listenClickApply(event) {
        event.preventDefault();
        profileAction.saveAddCard({
            number: document.getElementById('cardNumber').value,
            expiry: document.getElementById('month').value + '/' +
                document.getElementById('year').value,
            cvc: document.getElementById('cvc').value,
        });
    }
}
