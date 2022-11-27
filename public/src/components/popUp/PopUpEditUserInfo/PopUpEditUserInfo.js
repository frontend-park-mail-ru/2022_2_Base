import PopUpEditUserInfoTemplate from './PopUpEditUserInfo.hbs';
import './PopUpEditUserInfo.scss';
import {profileAction} from '../../../actions/profile';
import BasePopUp from '../BasePopUp';
import userStore from '../../../stores/UserStore';
import validation from '../../../modules/validation';

/**
 * Класс для реализации компонента Footer
 */
export default class PopUpEditUserInfo extends BasePopUp {
    /**
     * Конструктор, создающий класс компонента PopUpEditUserInfo
     * @param {Element} parent HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent) {
        super(parent, [PopUpEditUserInfoTemplate, 'user-info']);
    }

    /**
     * Функция для передачи в слушателе click на сохранение новых данных.
     * @param {object} event - событие
     */
    async listenClickApply(event) {
        event.preventDefault();
        const data = {
            value: document.getElementById(this.context.id + '__popUp').value,
            id: this.context.id,
        };
        const dataForVal = {};
        dataForVal[userStore.getContext(userStore._storeNames.context)
            .fields[data.id].popUpName] = data.value;
        if (validation.validate(dataForVal)) {
            profileAction.saveEditData(data);
            console.log(this.context);
        }
    }


    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param {Object} context контекст отрисовки шаблона
     * @return {Object} наполнение для формы
     */
    prepareRenderData(context) {
        const data = {
            title: context.getAttribute('name'),
            id: context.id,
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
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {object} context, с учетом которого будет произведен рендер
     */
    render(context) {
        super.render(this.prepareRenderData(context));
    }
}
