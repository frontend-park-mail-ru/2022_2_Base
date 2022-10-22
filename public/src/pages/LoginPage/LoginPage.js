import '../templates.js';
import BasePage from '../BasePage.js';
import FormComponent from '../../components/Form/Form.js';
import Req from '../../modules/ajax.js';
import validation from '../../modules/validation.js';
import errorMessage from '../../modules/ErrorMessage.js';

const ERROR_400_MESSAGE = 'Ошибка. Попробуйте еще раз';
const ERROR_401_MESSAGE = 'Неверная почта или пароль';
const SERVER_ERROR_MESSAGE = 'Ошибка сервера. Попробуйте позже';

/**
 * Класс, реализующий страницу входа.
 */
export default class LoginPage extends BasePage {
    context = {
        fields: {
            email: {
                title: 'Почта',
                type: 'email',
                name: 'email',
                placeholder: 'mail@website.com',
                maxLength: '30',
                errorID: 'emailError',
            },
            password: {
                title: 'Пароль',
                type: 'password',
                name: 'password',
                placeholder: 'Введите пароль',
                maxLength: '16',
                errorID: 'passwordError',
            },
        },
        button: {
            buttonValue: 'Войти',
        },
    };

    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['LoginPage.hbs'],
        );
    }

    /**
     * Метод, удаляющий слушатели.
     * @param {any} context контекст данных для страницы
     */
    removeEventListener(context) {
        const form = document.getElementById('login-form');
        form.removeEventListener('focusin', this.onFocusinHandler);
        form.removeEventListener('submit', this.onSubmitHandler);
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
        if (this.validate(data)) {
            const r = new Req();
            const [email, password] = Array.from(data);
            const [status] = await r.makePostRequest(config.api.login, {
                password,
                email,
            }).catch((err) => console.log(err));

            switch (status) {
            case 201:
                console.log('auth');
                config.auth.authorised = true;
                window.dispatchEvent(config.auth.event);
                config.currentPage = config.header.main.render(config);
                this.removeEventListener(this.context);
                break;
            case 400:
                !document.getElementById('Error400Message') ?
                    errorMessage.getServerMessage(document.getElementById('inForm'),
                        'Error400Message', ERROR_400_MESSAGE) :
                    console.log('bad request: ', status);
                break;
            case 401:
                errorMessage.getErrorMessage(document.getElementById(fields.email.name),
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
    };

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render(config) {
        super.render(this.context);

        /* Создание и отрисовка компонента Form */
        this.formComponent = new FormComponent(document.getElementById('login-form'));
        this.formComponent.render(this.context);

        const form = document.getElementById('login-form');
        document.getElementById(this.context.fields.email.name).focus();

        form.addEventListener('focusin', this.onFocusinHandler);
        form.addEventListener('submit', this.onSubmitHandler.bind(this, config, form));
    }

    /**
     * Метод, осуществляющий валидацию данных из формы.
     * @param {object} data - объект, содержащий данные из формы
     * @return {boolean} статус валидации
     */
    validate(data) {
        let isValid = true;
        Object.entries(data).forEach(([key, value]) => {
            switch (key) {
            case this.context.fields.email.name:
                isValid &= errorMessage.validateFiled(validation.validateEMail(value),
                    this.context.fields.email);
                break;
            case this.context.fields.password.name:
                isValid &= errorMessage.validateFiled(validation.validatePassword(value),
                    this.context.fields.password);
                break;
            }
        });
        return isValid;
    }
}
