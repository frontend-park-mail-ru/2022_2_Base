import registerPageTemplate from './RegisterPage.hbs';
import BasePage from '../BasePage.js';
import FormComponent from '../../components/Form/Form.js';
import errorMessage from '../../modules/ErrorMessage.js';
import router from '../../modules/Router.js';
import './RegisterPage.scss';
import userStore from '../../stores/UserStrore.js';
import {userActions, UserActionTypes} from '../../actions/user.js';
import {config} from '../../config.js';
import refresh from '../../modules/refreshElements.js';

const ERROR_400_MESSAGE = 'Ошибка. Попробуйте еще раз';
const ERROR_401_MESSAGE = 'Неверная почта или пароль';
const SERVER_ERROR_MESSAGE = 'Ошибка сервера. Попробуйте позже';

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
        userStore.addListener(this.#authServerResponse, UserActionTypes.USER_REGISTER);
    }

    /**
     * В зависимости от статуса ответа показывает ошибку или редиректит
     */
    #authServerResponse() {
        const status = userStore.getContext(userStore._storeNames.responseCode);
        switch (status) {
        case 201:
            refresh.onAuth();
            router.openPage(config.href.main); // fix change to prev
            break;
        case 400:
            !document.getElementById('Error400Message') ?
                errorMessage.getServerMessage(document.getElementById('inForm'),
                    'Error400Message', ERROR_400_MESSAGE) :
                console.log('bad request: ', status);
            break;
        case 401:
            errorMessage.getErrorMessage(document.getElementById(this.context.fields.email.name),
                'emailError', ERROR_401_MESSAGE);
            console.log('no auth: ', status);
            break;
        default:
            !document.getElementById('serverErrorMessage') ?
                errorMessage.getServerMessage(document.getElementById('inForm'),
                    'serverErrorMessage', SERVER_ERROR_MESSAGE) :
                console.log('server error: ', status);
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
        userActions.signup(data);
    };

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render() {
        this.context = userStore.getContext(userStore._storeNames.context);
        super.render(this.context);

        /* Создание и отрисовка компонента Form */
        this.formComponent = new FormComponent(document.getElementById('signup__form'));
        this.formComponent.render(this.context);

        const form = document.getElementById('signup__form');
        document.getElementById(this.context.fields.name.name).focus();

        form.addEventListener('focusin', this.onFocusinHandler);
        this.onSubmitHandlerRemove = this.onSubmitHandler.bind(this, config, form);
        form.addEventListener('submit', this.onSubmitHandlerRemove);
    }
}
