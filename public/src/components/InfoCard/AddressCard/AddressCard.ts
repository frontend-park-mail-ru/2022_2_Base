import PopUpAddAddress from '../../popUp/PopUpAddAddress/PopUpAddAddress';
import AddressCardTemplate from './addressCard.hbs';
import './AddressCard.scss';
import userStore from '../../../stores/UserStore';
import BaseInfoCard from '../BaseInfoCard';
import {profileAction} from '../../../actions/profile';
import {config} from '../../../config';

/**
 * Класс для реализации компонента Footer
 */
export default class AddressCard extends BaseInfoCard {
    /**
     * Конструктор, создающий класс компонента AddressCard
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        const popup = document.getElementById('popUp_user-page');
        const fadePopup = document.getElementById('popUp-fade_user-page');

        if (fadePopup && popup) {
            const popupClass = new PopUpAddAddress(popup);
            super(parent,
                [
                    popup,
                    fadePopup,
                    userStore._storeNames.address,
                    popupClass,
                    AddressCardTemplate,
                    'address',
                ]);
        } else {
            const popupClass = new PopUpAddAddress(config.empyNode);
            super(parent,
                [
                    config.empyNode,
                    config.empyNode,
                    userStore._storeNames.address,
                    popupClass,
                    AddressCardTemplate,
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
            profileAction.deleteAddress(Number(event.target.id.replace('delete-img-addressCard/', '')));
        }
    }
    /**
     * Метод, добавляющий слушатели.
     * @param addCard - контекст для навешивания обработчиков
     */
    override startEventListener(addCard: boolean) {
        super.startEventListener(addCard);
        super.startEdit();
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
        super.removeEventListener();
        super.removeEdit();
    }
}
