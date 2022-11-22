import BaseComponent from '../BaseComponent.js';
import PopUpEditUserInfoTemplate from './PopUpEditUserInfo.hbs';
import './PopUpEditUserInfo.scss';
import {profileAction} from '../../actions/profile.js';

/**
 * Класс для реализации компонента Footer
 */
export default class PopUpEditUserInfo extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента PopUpEditUserInfo
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent);
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
        }
    }

    /**
     * Функция для передачи в слушателе click на сохранение новых данных.
     * @param {object} event - событие
     */
    async listenClickApply(event) {
        event.preventDefault();

        profileAction.saveEditData({
            value: document.getElementById(this.context.id + '__popUp').value,
            id: this.context.id,
        });
    }


    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} наполнение для формы
     */
    prepareRenderData(context) {
        const data = {
            title: context.getAttribute('name'),
            fields: {
                field1: {
                    name: context.getAttribute('name'),
                    id: context.id + '__popUp',
                    type: context.id,
                },
            },
        };

        switch (context.id) {
        case 'name':
            data.title = 'имя';
            break;
        case 'email':
            data.title = 'почту';
            break;
        case 'phone':
            data.title = 'телефон';
            break;
        case 'password':
            data.fields.field1.name = 'Новый пароль';
            data.fields.field1.value = context.value;

            data.fields.field2 = {};
            data.fields.field2.name = 'Повторить пароль';
            data.fields.field2.value = '';
            data.fields.field2.type = context.id;
            data.fields.field2.id = context.id + '__2__popUp';
        }
        return data;
    }

    /**
     * Метод, добавляющий слушатели.
     */
    startEventListener() {
        const cancel = document.getElementById('popup-form_user-info__cancel');
        cancel.addEventListener('click', this.listenClickCancel);

        const apply = document.getElementById('popup-form_user-info__apply');
        this.listenClickApplyBind = this.listenClickApply.bind(this);
        apply.addEventListener('click', this.listenClickApplyBind);
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        const cancel = document.getElementById('.popup-form_user-info__cancel');
        cancel.removeEventListener('click', this.listenClickCancel);

        const apply = document.getElementById('.popup-form_user-info__apply');
        apply.removeEventListener('click', this.listenClickApplyBind);
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {object} context, с учетом которого будет произведен рендер
     */
    render(context) {
        this.context = context;
        super.render(this.prepareRenderData(context), PopUpEditUserInfoTemplate);
        this.startEventListener();
    }
}
