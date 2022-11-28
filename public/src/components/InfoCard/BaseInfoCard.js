import BaseComponent from '../BaseComponent';
import userStore from '../../stores/UserStore';

/**
 * Класс для реализации компонента Footer
 */
export default class BaseInfoCard extends BaseComponent {
    /**
     * Конструктор, создающий класс компонента Card
     * @param {Element} parent HTML-элемент, в который будет
     * @param {array} childClassData данные дочернего класса
     */
    constructor(parent, childClassData) {
        super(parent);
        [this.PopUp, this.PopUpFade, this.storeData,
            this.PopUpClass, this.template, this.pageName] = childClassData;
    }

    /**
     * Функция для передачи в слушателе click на значок редактирования
     * адреса
     * @param {object} event - событие
     */
    async listenClickEdit(event) {
        const cardID = event.target.id.replace('edit-img-', '');
        userStore.getContext(this.storeData).forEach((context) => {
            if (context.id === cardID) {
                this._showPopUp(context);
            }
        });
    }

    /**
     * Функция для передачи в слушателе click на значок добавления
     * адреса
     * @param {object} event - событие
     */
    async listenClickAdd(event) {
        this._showPopUp({
            add: true,
        });
    }

    /**
     * Функция для отрисовки попапа
     * @param {object} data - данные для передачи в попап
     */
    _showPopUp(data) {
        if (this.PopUp) {
            this.PopUp.style.display = 'grid';
        }
        if (this.PopUpFade) {
            this.PopUpFade.style.display = 'grid';
        }

        this.PopUpClass.render(data);
    }

    /**
     * Функция для передачи в слушателе click на значок удаления
     * адреса
     * @param {object} event - событие
     */
    async listenClickDelete(event) {
        console.warn('must be overriden');
    }

    /**
     * Метод, добавляющий слушатели.
     * @param {boolean} addCard - контекст для навешивания обработчиков
     */
    startEventListener({addCard}) {
        this.delete = document.querySelectorAll('.delete-' + this.pageName);
        if (this.delete.length) {
            this.bindListenClickDelete = this.listenClickDelete.bind(this);
            this.delete.forEach((key) => {
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
     * Метод, удаляющий слушатель изменения.
     */
    startEdit() {
        this.edit = document.querySelectorAll(`.edit-${this.pageName}`);
        if (this.edit.length) {
            this.bindListenClickEdit = this.listenClickEdit.bind(this);
            this.edit.forEach((key) => {
                key.addEventListener('click', this.bindListenClickEdit);
            });
        }
    }
    /**
     * Метод, удаляющий слушатель изменения.
     */
    removeEdit() {
        if (this.edit.length) {
            this.edit.forEach((key) => {
                key.removeEventListener('click', this.bindListenClickEdit);
            });
        }
    }

    /**
     * Метод, удаляющий слушатели.
     */
    removeEventListener() {
        if (this.delete.length) {
            this.delete.forEach((key) => {
                key.removeEventListener('click', this.bindListenClickDelete);
            });
        }

        if (this.new) {
            this.new.addEventListener('click', this.bindListenClickAdd);
        }
    }

    /**
     * Метод, отрисовывающий компонент в родительский HTML-элемент по заданному шаблону,
     * импортированному из templates.js
     * @param {context} context, с учетом которого будет произведен рендер
     */
    render(context) {
        this.context = context;
        super.render(super.prepareCategory(context), this.template);
        this.startEventListener(context);
    }
}
