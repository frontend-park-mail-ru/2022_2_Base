import registerPageTemplate from './RegisterPage.hbs';
import BasePage from '../BasePage';
import FormComponent from '../../components/Form/Form';
import errorMessage from '../../modules/ErrorMessage';
import router from '../../modules/Router';
import './RegisterPage.scss';
import userStore from '../../stores/UserStore';
import {userActions, UserActionTypes} from '../../actions/user';
import {config} from '../../config';
import refresh from '../../modules/refreshElements';
import cartStore from '../../stores/CartStore';
import {cartAction, CartActionTypes} from '../../actions/cart';
import validation from '../../modules/validation';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class RegisterPage extends BasePage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            registerPageTemplate,
        );
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        userStore.addListener(this.#authServerResponse, UserActionTypes.USER_REGISTER);
        cartStore.addListener(() => router.openPage(config.href.main), CartActionTypes.MERGE_CART);
    }

    /**
     * В зависимости от статуса ответа показывает ошибку или редиректит
     */
    #authServerResponse() {
        const status = userStore.getContext(userStore._storeNames.responseCode);
        switch (status) {
        case 201:
            refresh.onAuth();
            cartAction.mergeCart();
            break;
        case 400:
            !document.getElementById('Error400Message') ?
                errorMessage.getServerMessage(document.getElementById('inForm'),
                    'Error400Message', config.errorMessages.error400auth) :
                console.log('bad request: ', status);
            break;
        case 401:
            errorMessage.getErrorMessage(document.getElementById(
                userStore.getContext(userStore._storeNames.context).fields.email.name),
            'emailError', config.errorMessages.error401auth);
            break;
        default:
            errorMessage.getAbsoluteErrorMessage();
            break;
        }
    }

    /**
     * Метод, удаляющий слушатели.
     * @param {any} context контекст данных для страницы
     */
    removeEventListener(context) {
        const form = document.getElementById('signup__form');
        form.removeEventListener('focusin', this.onFocusinHandler);
        form.removeEventListener('submit', this.onSubmitHandlerRemove);
    }

    /**
     * Метод, обрабатывающий получение фокуса полем.
     * @param {object} event событие получения фокуса полем
     */
    async onFocusinHandler(event) {
        errorMessage.deleteErrorMessage(event.target.name);
    };

    /**
     * Функция, обрабатывающая посылку формы.
     * @param {object} config глобальный контекст
     * @param {object} form поля формы
     * @param {object} event событие отправки формы
     */
    async onSubmitHandler(config, form, event) {
        event.preventDefault();

        /* Сохранить данные из формы в переменную */
        const data = {};
        const {fields} = this.context;
        Object.keys(fields).forEach((page) => {
            const element = form.querySelector(`[name=${fields[page].name}]`);
            data[fields[page].name] = element.value;
        });
        data.email = data.email.trim();

        // Удаление отрисованных ошибок
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                errorMessage.deleteErrorMessage(key);
            }
        }

        /* Проверка почты и пароля и отрисовка ошибок на странице */
        if (validation.validate(data)) {
            userActions.signup(data);
        }
    };

    /**
     * Метод, отрисовывающий страницу.
     */
    render() {
        this.context = userStore.getContext(userStore._storeNames.context);
        delete this.context.fields.phone;
        super.render(this.context);

        this.formComponent = new FormComponent(document.getElementById('signup__form'));
        this.formComponent.render(this.context);

        const form = document.getElementById('signup__form');
        document.getElementById(this.context.fields.name.name).focus();

        form.addEventListener('focusin', this.onFocusinHandler);
        this.onSubmitHandlerRemove = this.onSubmitHandler.bind(this, config, form);
        form.addEventListener('submit', this.onSubmitHandlerRemove);
    }
}
