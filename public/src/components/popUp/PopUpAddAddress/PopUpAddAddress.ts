import PopUpAddAddressTemplate from './PopUpAddAddress.hbs';
import './PopUpAddAddress.scss';
import {profileAction} from '../../../actions/profile';
import BasePopUp from '../BasePopUp';
import validation from '../../../modules/validation';
import errorMessage from '../../../modules/ErrorMessage';

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
        super(parent, [PopUpAddAddressTemplate, 'add-address']);
    }

    /**
     * Функция для передачи в слушателе click на сохранение новых данных.
     * @param {object} event - событие
     */
    async listenClickApply(event) {
        event.preventDefault();
        const inputData = {
            city: document.getElementById('city').value,
            street: document.getElementById('street').value,
            house: document.getElementById('house').value,
            flat: document.getElementById('flat').value,
            id: Number(this.context.id?.replace('addressCard/', '')),
        };

        const validateMessage = validation.validateAddress(inputData);
        if (validateMessage) {
            errorMessage.getAbsoluteErrorMessage(validateMessage);
        } else if (this.context.add) {
            profileAction.saveAddAddress(inputData);
        } else {
            profileAction.saveEditAddress(inputData);
        }
    }
}
