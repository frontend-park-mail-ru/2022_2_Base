import BaseComponent from '../BaseComponent';
import PopUpChooseAddressAndPaymentCard from './PopUpChooseAddressAndPaymentCard.hbs';
import './PopUpChooseAddressAndPaymentCard.scss';
import {config} from '../../config';

/**
 * Класс для реализации компонента Footer
 */
export default class PopUpAddPaymentCard extends BaseComponent {
    bindListenClickAddressAndPaymentCard: Array<addListenerFunction>;
    cancelElement: HTMLElement | null;
    popUpFields: NodeListOf<Element> | undefined;
    popUp: HTMLElement | null;
    popUpFade: HTMLElement | null;

    /**
     * Конструктор, создающий класс компонента PopUpAddPaymentCard
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(parent);

        this.bindListenClickAddressAndPaymentCard = [config.noop];
        this.cancelElement = null;
        this.popUp = document.getElementById('popUp');
        this.popUpFade = document.getElementById('popUp-fade');
    }

    /**
     * Метод, убирающий поп-ап при клике мимо него.
     * @param event - событие, вызвавшее обработчик
     */
     async removePopUpClickFromOutside(event: Event) {
        if (event.target !== this.popUp) {
            this.listenClickCancel.bind(this, event);
        }
    }

    /**
     * Функция для передачи в слушателе click на отмену изменений данных.
     * @param event - событие
    */
    async listenClickCancel(event: Event) {
        event.preventDefault();

        if (this.popUp) {
            this.popUp.style.display = 'none';
            this.popUp.replaceChildren();
        }
        if (this.popUpFade) {
            this.popUpFade.style.display = 'none';
            config.HTMLskeleton.body.style.overflow = 'visible';
        }
    }

    /**
     * Функция для передачи в слушателе click на выбор новых данных.
     * @param id - id элемента
     */
    async listenClickAddressAndPaymentCard(id: string) {
        const chooseAddress = document.getElementById(id);
        if (chooseAddress) {
            const fields = document.querySelectorAll('.cart-popup-form__input');
            if (fields) {
                fields.forEach((key) => {
                    (key as HTMLElement).style.border = '2px solid #d5d5d5';
                    if (key.classList.contains('choice')) {
                        key.classList.remove('choice');
                    }
                });
            }
            chooseAddress.style.border = '2px solid #6369D1';
            chooseAddress.classList.add('choice');
        }
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        this.cancelElement = document.getElementById('cart-popup-form__cancel');
        if (this.cancelElement) {
            this.cancelElement.addEventListener('click', this.listenClickCancel.bind(this));
        }

        this.popUpFields = document.querySelectorAll('.cart-popup-form__input');
        if (this.popUpFields) {
            this.bindListenClickAddressAndPaymentCard = [];
            this.popUpFields.forEach((key: Element, i: number) => {
                this.bindListenClickAddressAndPaymentCard.push(
                    this.listenClickAddressAndPaymentCard.bind(null, key.id));
                key.addEventListener('click', this.bindListenClickAddressAndPaymentCard[i]);
            });
        }

        if (this.popUpFade && this.popUp) {
            this.popUpFade.addEventListener('click', this.removePopUpClickFromOutside.bind(this));
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
        if (this.cancelElement) {
            this.cancelElement.removeEventListener('click', this.listenClickCancel.bind(this));
        }

        if (this.popUpFields) {
            this.popUpFields.forEach((key: Element, i: number) => {
                key.removeEventListener('click',
                    this.bindListenClickAddressAndPaymentCard[i]);
            });
        }

        if (this.popUpFade && this.popUp) {
            this.popUpFade.removeEventListener('click', this.removePopUpClickFromOutside.bind(this));
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param context - контекст отрисовки шаблона
     */
    override render(context: any) {
        super.render(context, PopUpChooseAddressAndPaymentCard);
        this.startEventListener();
    }
}
