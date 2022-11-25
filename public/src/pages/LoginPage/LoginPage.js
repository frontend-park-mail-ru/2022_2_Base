import loginPageTemplate from './LoginPage.hbs';
import BasePage from '../BasePage';
import FormComponent from '../../components/Form/Form';
import errorMessage from '../../modules/ErrorMessage';
import router from '../../modules/Router';
import './LoginPage.scss';
import {userActions, UserActionTypes} from '../../actions/user';
import userStore from '../../stores/UserStrore';
import {config} from '../../config';
import refresh from '../../modules/refreshElements';
import {cartAction, CartActionTypes} from '../../actions/cart';
import cartStore from '../../stores/CartStore';

/**
 * Класс, реализующий страницу входа.
 */
export default class LoginPage extends BasePage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            loginPageTemplate,
        );
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    addListener() {
        userStore.addListener(this.#authServerResponse, UserActionTypes.USER_LOGIN);
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
                    'Error400Message', config.errorMessages.ERROR_400_MESSAGE) :
                console.log('bad request: ', status);
            break;
        case 401:
            errorMessage.getErrorMessage(document.getElementById(
                userStore.getContext(userStore._storeNames.context).fields.email.name),
            'emailError', config.errorMessages.ERROR_401_MESSAGE);
            console.log('no auth: ', status);
            break;
        default:
            !document.getElementById('serverErrorMessage') ?
                errorMessage.getServerMessage(document.getElementById('inForm'),
                    'serverErrorMessage', config.errorMessages.SERVER_ERROR_MESSAGE) :
                console.log('server error: ', status);
            break;
        }
    }

    /**
     * Метод, удаляющий слушатели.
     * @param {any} context контекст данных для страницы
     */
    removeEventListener(context) {
        const form = document.getElementById('login-form');
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
     * Метод, обрабатывающий отсылку формы.
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
        /* Удаление отрисованных ошибок */
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                errorMessage.deleteErrorMessage(key);
            }
        }
        /* Проверка почты и пароля и отрисовка ошибок на странице */
        userActions.login(data);
    };

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render(config) {
        this.context = userStore.getContext(userStore._storeNames.context);
        this.context = {
            fields: {
                email: this.context.fields.email,
                password: this.context.fields.password,
            },
            button: {
                buttonValue: 'Войти',
            },
        };
        super.render(this.context);

        /* Создание и отрисовка компонента Form */
        this.formComponent = new FormComponent(document.getElementById('login-form'));
        this.formComponent.render(this.context);

        const form = document.getElementById('login-form');
        document.getElementById(this.context.fields.email.name).focus();

        form.addEventListener('focusin', this.onFocusinHandler);
        this.onSubmitHandlerRemove = this.onSubmitHandler.bind(this, config, form);
        form.addEventListener('submit', this.onSubmitHandlerRemove);
    }
}
