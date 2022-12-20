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
import {RecordString} from '../../../../types/tuples';
import {addEventListenerFunction} from '../../../../types/aliases';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class RegisterPage extends BasePage {
    context: any;
    formComponent: FormComponent | undefined;
    onSubmitHandlerRemove: addEventListenerFunction;
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param parent - HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent: HTMLElement) {
        super(
            parent,
            registerPageTemplate,
        );

        this.onSubmitHandlerRemove = config.noop;
    }

    /**
     * Функция, регистрирующая листенеры сторов
     */
    override addListener() {
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
        const form = document.getElementById('signup__form');
        if (form) {
            form.removeEventListener('focusin', this.onFocusinHandler);
            form.removeEventListener('submit', this.onSubmitHandlerRemove);
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
     * Функция, обрабатывающая посылку формы.
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
            userActions.signup(data);
        }
    }

    /**
     * Метод, отрисовывающий страницу.
     */
    override render() {
        this.context = userStore.getContext(userStore._storeNames.context);
        const tempPhone = this.context.fields.phone;
        delete this.context.fields.phone;
        super.render(this.context);
        this.context.fields.phone = tempPhone;

        const form = document.getElementById('signup__form');
        if (form) {
            this.formComponent = new FormComponent(form);
            this.formComponent.render(this.context);

            const nameElement = document.getElementById(this.context.fields.name.name);
            if (nameElement) {
                nameElement.focus();
            }
            form.addEventListener('focusin', this.onFocusinHandler);
            this.onSubmitHandlerRemove = this.onSubmitHandler.bind(this, config, form);
            form.addEventListener('submit', this.onSubmitHandlerRemove);
        } else {
            errorMessage.getAbsoluteErrorMessage();
        }
    }
}
