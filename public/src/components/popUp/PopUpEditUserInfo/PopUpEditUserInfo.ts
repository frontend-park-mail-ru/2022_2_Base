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
    constructor(parent: HTMLElement) {
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
     * Метод, подготавливающий наполнение для формы, исходя из контекста
     * @param context - контекст отрисовки шаблона
     * @returns наполнение для формы
     */
    prepareRenderData(context: HTMLInputElement) {
        const field1 = {
            name: context.getAttribute('name'),
            id: context.id + '__popUp',
            type: context.id,
            value: '',
        };
        const data = {
            title: context.getAttribute('name'),
            id: context.id,
            fields: [field1],
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
            field1.name = 'Новый пароль';
            field1.value = context.value;
            data.fields.push({
                name: 'Повторить пароль',
                id: context.id + '__2__popUp',
                type: context.id,
                value: '',
            });
        }
        return data;
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param context - контекст, с учетом которого будет произведен рендер
     */
    override render(context: object) {
        if (context instanceof HTMLElement) {
            super.render(this.prepareRenderData(context as HTMLInputElement));
        }
    }
}
