import BaseComponent from '../BaseComponent';
import userStore from '../../stores/UserStore';
import {config} from '../../config';
import {addEventListenerFunction} from '../../../../types/aliases';
import PopUpAddPaymentCard from '../popUp/PopUpAddPaymentCard/PopUpAddPaymentCard';
import PopUpAddAddress from '../popUp/PopUpAddAddress/PopUpAddAddress';
import {InfoCardBaseInfoObj} from '../../../../types/tuples';

/**
 * Класс для реализации компонента Footer
 */
export default class BaseInfoCard extends BaseComponent {
    PopUp: HTMLElement;
    PopUpClass: PopUpAddPaymentCard | PopUpAddAddress;
    PopUpFade: HTMLElement;
    bindListenClickAdd: addEventListenerFunction;
    bindListenClickDelete: addEventListenerFunction;
    bindListenClickEdit: addEventListenerFunction;
    context: any;
    delete: NodeListOf<HTMLElement> | undefined;
    edit: NodeListOf<HTMLElement> | undefined;
    new: HTMLElement | null;
    pageName: string;
    storeData: string;
    template: HandlebarsTemplateDelegate;
    /**
     * Конструктор, создающий класс компонента Card
     * @param parent - HTML-элемент, в который будет
     * @param childClassData - данные дочернего класса
     */
    protected constructor(parent: HTMLElement, childClassData: InfoCardBaseInfoObj) {
        super(parent);
        [this.PopUp, this.PopUpFade, this.storeData,
            this.PopUpClass, this.template, this.pageName] = childClassData;

        this.bindListenClickAdd = config.noop;
        this.bindListenClickDelete = config.noop;
        this.bindListenClickEdit = config.noop;

        this.delete = undefined;
        this.edit = undefined;
        this.new = null;
    }

    /**
     * Функция для передачи в слушателе click на значок редактирования
     * адреса
     * @param event - событие
     */
    async listenClickEdit(event: Event) {
        if (event.target instanceof HTMLElement) {
            const cardID = event.target.id.replace('edit-img-', '');
            userStore.getContext(this.storeData).forEach((context: any) => {
                if (context.id === cardID) {
                    this._showPopUp(context);
                }
            });
        }
    }

    /**
     * Функция для передачи в слушателе click на значок добавления
     * адреса
     * @param event - событие
     */
    async listenClickAdd(event: Event) {
        this._showPopUp({
            add: true,
        });
    }

    /**
     * Функция для отрисовки попапа
     * @param data - данные для передачи в попап
     */
    _showPopUp(data: object) {
        if (this.PopUp) {
            this.PopUp.style.display = 'grid';
        }
        if (this.PopUpFade) {
            this.PopUpFade.style.display = 'grid';
            config.HTMLskeleton.body.style.overflow = 'hidden';
        }

        this.PopUpClass.render(data);
    }

    /**
     * Функция для передачи в слушателе click на значок удаления
     * адреса
     * @param event - событие
     */
    async listenClickDelete(event: Event) {
        console.warn('must be overriden');
    }

    /**
     * Метод, добавляющий слушатели.
     * @param addCard - контекст для навешивания обработчиков
     */
    startEventListener(addCard: boolean) {
        this.delete = document.querySelectorAll('.delete-' + this.pageName);
        if (this.delete.length) {
            this.bindListenClickDelete = this.listenClickDelete.bind(this);
            this.delete.forEach((key: HTMLElement) => {
                key.addEventListener('click', this.bindListenClickDelete);
            });
        }
        if (addCard) {
            this.new = document.getElementById(`add-${this.pageName}`);
            if (this.new) {
                this.bindListenClickAdd = this.listenClickAdd.bind(this);
                this.new.addEventListener('click', this.bindListenClickAdd);
            }
        }
    }

    /**
     * Метод, добавляющий слушатель изменения.
     */
    startEdit() {
        this.edit = document.querySelectorAll(`.edit-${this.pageName}`);
        if (this.edit.length) {
            this.bindListenClickEdit = this.listenClickEdit.bind(this);
            this.edit.forEach((key: HTMLElement) => {
                key.addEventListener('click', this.bindListenClickEdit);
            });
        }
    }
    /**
     * Метод, удаляющий слушатель изменения.
     */
    removeEdit() {
        if (this.edit && this.edit.length) {
            this.edit.forEach((key: HTMLElement) => {
                key.removeEventListener('click', this.bindListenClickEdit);
            });
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    override removeEventListener() {
        if (this.delete && this.delete.length) {
            this.delete.forEach((key: HTMLElement) => {
                key.removeEventListener('click', this.bindListenClickDelete);
            });
        }

        if (this.new) {
            this.new.removeEventListener('click', this.bindListenClickAdd);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param context - контекст, с учетом которого будет произведен рендер
     */
    override render(context: Array<CardObj>) {
        this.context = context;
        super.render(super.prepareCategory(context), this.template);
        this.startEventListener(context[context.length - 1].addCard ?? false);
    }
}
