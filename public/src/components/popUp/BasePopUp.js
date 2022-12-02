import BaseComponent from '../BaseComponent';

/**
 * Класс для реализации компонента Footer
 */
export default class BasePopUp extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента PopUpAddPaymentCard
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     * @param {Array} childClassData данные из дочернего класса
     */
    constructor(parent, childClassData) {
        super(parent);
        [this.template, this.pageName] = childClassData;
    }

    /**
     * Функция для передачи в слушателе click на отмену изменений данных.
     * @param {object} event - событие
     */
    async listenClickCancel(event) {
        event.preventDefault();

        const PopUp = document.getElementById('popUp_user-page');
        const PopUpFade = document.getElementById('popUp-fade_user-page');
        if (PopUp) {
            PopUp.style.display = 'none';
            PopUp.replaceChildren();
        }
        if (PopUpFade) {
            PopUpFade.style.display = 'none';
            document.getElementById('body').style.overflow = 'visible'
        }
    }

    /**
     * Функция для передачи в слушателе click на сохранение новых данных.
     * @param {object} event - событие
     */
    async listenClickApply(event) {
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
    removeEventListener() {
        this.cancel.removeEventListener('click', this.listenClickCancel);

        this.apply.removeEventListener('click', this.listenClickApplyBind);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {object} context, с учетом которого будет произведен рендер
     */
    render(context) {
        this.context = context;
        super.render(context, this.template);
        this.startEventListener();
    }
}
