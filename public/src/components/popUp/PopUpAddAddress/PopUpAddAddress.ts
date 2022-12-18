import PopUpAddAddressTemplate from './PopUpAddAddress.hbs';
import './PopUpAddAddress.scss';
import {profileAction} from '../../../actions/profile';
import BasePopUp from '../BasePopUp';
import validation from '../../../modules/validation';
import errorMessage from '../../../modules/ErrorMessage';
import {getInputValueById} from '../../../modules/sharedFunctions';

/**
 * Класс для реализации компонента Footer
 */
export default class PopUpAddPaymentCard extends BasePopUp {
    /**
     * Конструктор, создающий класс компонента PopUpAddPaymentCard
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent, [PopUpAddAddressTemplate, 'add-address']);
    }

    /**
     * Функция для передачи в слушателе click на сохранение новых данных.
     * @param event - событие
     */
    override async listenClickApply(event: Event) {
        event.preventDefault();
        const inputData = {
            city: (getInputValueById('city')).value,
            street: (getInputValueById('street')).value,
            house: (getInputValueById('house')).value,
            flat: (getInputValueById('flat')).value,
            id: Number(this.context.id?.replace('addressCard/', '')),
        };

        const validateMessage = validation.validateAddress(inputData);
        if (validateMessage) {
            errorMessage.getAbsoluteMessage(validateMessage);
        } else if (this.context.add) {
            profileAction.saveAddAddress(inputData);
        } else {
            profileAction.saveEditAddress(inputData);
        }
    }
}
