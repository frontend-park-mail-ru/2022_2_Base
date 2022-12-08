import PopUpEditUserInfoTemplate from './PopUpEditUserInfo.hbs';
import './PopUpEditUserInfo.scss';
import {profileAction} from '../../../actions/profile';
import BasePopUp from '../BasePopUp';
import userStore from '../../../stores/UserStore';
import validation from '../../../modules/validation';
import {getInputValueById} from '../../../modules/sharedFunctions';
import {RecordString} from '../../../../../types/tuples';

/**
 * Класс для реализации компонента Footer
 */
export default class PopUpEditUserInfo extends BasePopUp {
    /**
     * Конструктор, создающий класс компонента PopUpEditUserInfo
     * @param parent - HTML-элемент, в который будет
     * осуществлена отрисовка
     */
    constructor(parent: HTMLInputElement) {
        super(parent, [PopUpEditUserInfoTemplate, 'user-info']);
    }

    /**
     * Функция для передачи в слушателе click на сохранение новых данных.
     * @param event - событие
     */
    override async listenClickApply(event: Event) {
        event.preventDefault();
        const data = {
            value: (getInputValueById(this.context.id + '__popUp')).value,
            id: this.context.id,
        };
        const storeData = userStore.getContext(userStore._storeNames.context)
            .fields[data.id].popUpName;
        if (typeof storeData === 'string') {
            const dataForVal: RecordString = {};
            dataForVal[storeData] = data.value;
            if (validation.validate(dataForVal)) {
                profileAction.saveEditData(data);
            }
        }
    }


    /**
     * Метод, подготавливавающий наполнение для формы, исходя из контекста
     * @param context - контекст отрисовки шаблона
     * @returns наполнение для формы
     */
    prepareRenderData(context: HTMLInputElement) {
        const data = {
            title: context.getAttribute('name'),
            id: context.id,
            fields: {
                field1: {
                    name: context.getAttribute('name'),
                    id: context.id + '__popUp',
                    type: context.id,
                    value: '',
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

            // data.fields.field2 = {};
            // data.fields.field2.name = 'Повторить пароль';
            // data.fields.field2.value = '';
            // data.fields.field2.type = context.id;
            // data.fields.field2.id = context.id + '__2__popUp';
        }
        return data;
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param context - контекст, с учетом которого будет произведен рендер
     */
    override render(context: object) {
        if (context instanceof HTMLInputElement) {
            super.render(this.prepareRenderData(context));
        }
    }
}
