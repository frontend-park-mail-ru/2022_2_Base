import loginPageTemplate from './LoginPage.hbs';
import BasePage from '../BasePage';
import FormComponent from '../../components/Form/Form';
import errorMessage from '../../modules/ErrorMessage';
import router from '../../modules/Router';
import './LoginPage.scss';
import {userActions, UserActionTypes} from '../../actions/user';
import userStore from '../../stores/UserStore';
import {config} from '../../config';
import refresh from '../../modules/refreshElements';
import {cartAction, CartActionTypes} from '../../actions/cart';
import cartStore from '../../stores/CartStore';
import validation from '../../modules/validation';
import {addEventListenerFunction} from '../../../../types/aliases';
import {RecordString} from '../../../../types/tuples';

/**
 * Класс, реализующий страницу входа.
 */
export default class LoginPage extends BasePage {
    context: any;
    formComponent: FormComponent | undefined;
    onSubmitHandlerRemove: addEventListenerFunction;
    form: HTMLElement| null;
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param parent - HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(
            parent,
            loginPageTemplate,
        );

        this.onSubmitHandlerRemove = config.noop;
        this.form = null;
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    override addListener() {
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
                errorMessage.getServerMessage(
                    document.getElementById('inForm') ?? config.empyNode,
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
     */
    override removeEventListener() {
        if (this.form) {
            this.form.removeEventListener('focusin', this.onFocusinHandler);
            this.form.removeEventListener('submit', this.onSubmitHandlerRemove);
        }
    }

    /**
     * Метод, обрабатывающий получение фокуса полем.
     * @param event - событие получения фокуса полем
     */
    async onFocusinHandler(event: Event) {
        if (event.target instanceof HTMLInputElement) {
            errorMessage.deleteErrorMessage(event.target.name + 'Error');
        }
    }

    /**
     * Метод, обрабатывающий отсылку формы.
     * @param config - глобальный контекст
     * @param form - поля формы
     * @param event - событие отправки формы
     */
    async onSubmitHandler(config: object, form: HTMLElement, event: Event) {
        event.preventDefault();

        /* Сохранить данные из формы в переменную */
        const data: RecordString = {};
        const {fields} = this.context;
        Object.keys(fields).forEach((page) => {
            const element = form.querySelector(`[name=${fields[page].name}]`);
            if (element instanceof HTMLInputElement) {
                data[fields[page].name] = element.value;
            }
        });
        data.email = data.email.trim();

        /* Проверка почты и пароля и отрисовка ошибок на странице */
        if (validation.validate(data)) {
            userActions.login(data);
        }
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    override render() {
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

        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            this.formComponent = new FormComponent(loginForm);
            this.formComponent.render(this.context);

            this.form = document.getElementById('login-form');
            if (this.form) {
                const nameElement = document.getElementById(this.context.fields.email.name);
                if (nameElement) {
                    nameElement.focus();
                }

                this.form.addEventListener('focusin', this.onFocusinHandler);
                this.onSubmitHandlerRemove = this.onSubmitHandler.bind(this, config, this.form);
                this.form.addEventListener('submit', this.onSubmitHandlerRemove);
            } else {
                errorMessage.getAbsoluteErrorMessage();
            }
        } else {
            errorMessage.getAbsoluteErrorMessage();
        }
    }
}
