import BaseComponent from '../BaseComponent';
import {config} from '../../config';
import {addEventListenerFunction} from '../../../../types/aliases';

/**
 * Класс для реализации компонента Footer
 */
export default class BasePopUp extends BaseComponent {
    apply: HTMLElement | null;
    cancel: HTMLElement | null;
    context: any;
    listenClickApplyBind: addEventListenerFunction;
    pageName: string;
    template: HandlebarsTemplateDelegate;
    /**
     * Конструктор, создающий класс компонента PopUpAddPaymentCard
     * @param parent - HTML-элемент, в который будет осуществлена отрисовка
     * @param childClassData - данные из дочернего класса
     */
    constructor(parent: HTMLElement, childClassData: [HandlebarsTemplateDelegate, string]) {
        super(parent);
        [this.template, this.pageName] = childClassData;

        this.apply = null;
        this.cancel = null;

        this.listenClickApplyBind = config.noop;
    }

    /**
     * Функция для передачи в слушателе click на отмену изменений данных.
     * @param event - событие
     */
    async listenClickCancel(event: Event) {
        event.preventDefault();

        const PopUp = document.getElementById('popUp_user-page');
        const PopUpFade = document.getElementById('popUp-fade_user-page');
        if (PopUp) {
            PopUp.style.display = 'none';
            PopUp.replaceChildren();
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'none';
            config.HTMLskeleton.body.style.overflow = 'visible';
        }
    }

    /**
     * Функция для передачи в слушателе click на сохранение новых данных.
     * @param event - событие
     */
    async listenClickApply(event: Event) {
        console.warn('must be overridden in child class');
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        this.cancel = document.getElementById(`popup-form_${this.pageName}__cancel`);
        if (this.cancel) {
            this.cancel.addEventListener('click', this.listenClickCancel);
        }

        this.apply = document.getElementById(`popup-form_${this.pageName}__apply`);
        if (this.apply) {
            this.listenClickApplyBind = this.listenClickApply.bind(this);
            this.apply.addEventListener('click', this.listenClickApplyBind);
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
        this.cancel?.removeEventListener('click', this.listenClickCancel);

        this.apply?.removeEventListener('click', this.listenClickApplyBind);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param context - контекст, с учетом которого будет произведен рендер
     */
    override render(context: object) {
        this.context = context;
        super.render(context, this.template);
        this.startEventListener();
    }
}
