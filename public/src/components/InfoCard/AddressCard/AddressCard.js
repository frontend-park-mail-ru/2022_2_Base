import PopUpAddAddress from '../../PopUpAddAddress/PopUpAddAddress';
import AddressCardTemplate from './addressCard.hbs';
import './AddressCard.scss';
import userStore from '../../../stores/UserStrore';
import BaseInfoCard from '../BaseInfoCard';
import {profileAction} from '../../../actions/profile';

/**
 * Класс для реализации компонента Footer
 */
export default class AddressCard extends BaseInfoCard {
    /**
     * Конструктор, создающий класс компонента AddressCard
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        const popup = document.getElementById('popUp_user-page');
        const popupClass = new PopUpAddAddress(popup);

        super(parent,
            [popup,
                document.getElementById('popUp-fade_user-page'),
                userStore._storeNames.address,
                popupClass,
                AddressCardTemplate,
                'address']);
    }

    /**
     * Функция для передачи в слушателе click на значок удаления
     * адреса
     * @param {object} event - событие
     */
    async listenClickDelete(event) {
        profileAction.deleteAddress(Number(event.target.id.replace('delete-img-addressCard/', '')));
    }
    /**
     * Метод, добавляющий слушатели.
     * @param {boolean} addCard - контекст для навешивания обработчиков
     */
    startEventListener({addCard}) {
        super.startEventListener(addCard);
        super.strartEdit();
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        super.removeEventListener();
        super.removeEdit();
    }
}
