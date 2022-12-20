import PopUpAddPaymentCardTemplate from './PopUpAddPaymentCard.hbs';
import './PopUpAddPaymentCard.scss';
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
        super(parent, [PopUpAddPaymentCardTemplate, 'add-card']);
    }

    /**
     * Функция для передачи в слушателе click на сохранение новых данных.
     * @param event - событие
     */
    override async listenClickApply(event: Event) {
        event.preventDefault();
        const cardData = {
            number: (getInputValueById('cardNumber')).value,
            expiry: (getInputValueById('month')).value + '/' +
        (getInputValueById('year')).value,
            cvc: (getInputValueById('cvc')).value,
            id: 0,
        };
        const validateMessage = validation.validateCard(cardData);
        validateMessage ?
            errorMessage.getAbsoluteErrorMessage(validateMessage) :
            profileAction.saveAddCard(cardData);
    }
}
