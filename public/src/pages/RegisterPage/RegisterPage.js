import registerPageTemplate from './RegisterPage.hbs';
import BasePage from '../BasePage.js';
import FormComponent from '../../components/Form/Form.js';
import request from '../../modules/ajax.js';
import validation from '../../modules/validation.js';
import errorMessage from '../../modules/ErrorMessage.js';
import router from '../../modules/Router.js';
import './RegisterPage.scss';

const ERROR_400_MESSAGE = 'Ошибка. Попробуйте еще раз';
const ERROR_401_MESSAGE = 'Неверная почта или пароль';
const SERVER_ERROR_MESSAGE = 'Ошибка сервера. Попробуйте позже';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class RegisterPage extends BasePage {
    context = {
        fields: {
            name: {
                title: 'Имя',
                type: 'text',
                name: 'username',
                placeholder: 'Введите имя',
                maxLength: '30',
                errorID: 'nameError',
            },
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
                placeholder: 'Придумайте пароль',
                maxLength: '16',
                errorID: 'passwordError',
            },
            repeatPassword: {
                title: 'Повторить пароль',
                type: 'password',
                name: 'repeatPassword',
                placeholder: 'Повторите пароль',
                maxLength: '16',
                errorID: 'repeatPasswordError',
            },
        },
        button: {
            buttonValue: 'Зарегистрироваться',
        },
    };

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

        // timing email
        data.email = data.email.trim();

        // Удаление отрисованных ошибок
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                errorMessage.deleteErrorMessage(key);
            }
        }

        /* Проверка почты и пароля и отрисовка ошибок на странице */
        if (this.validate(data)) {
            const {username, email, password} = data;
            const [status] = await request.makePostRequest(config.api.signup, {
                password,
                email,
                username,
            }).catch((err) => console.log(err));

            switch (status) {
            case 201:
                console.log('auth');
                config.auth.authorised = true;
                router.remove(config.header.login.href);
                router.remove(config.header.signup.href);
                window.dispatchEvent(config.auth.event);
                router.openPage(config.header.main.href, config);
                break;
            case 400:
                document.getElementById('Error400Message') === null ?
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
        this.formComponent = new FormComponent(document.getElementById('signup__form'));
        this.formComponent.render(this.context);

        const form = document.getElementById('signup__form');
        document.getElementById(this.context.fields.name.name).focus();

        form.addEventListener('focusin', this.onFocusinHandler);
        this.onSubmitHandlerRemove = this.onSubmitHandler.bind(this, config, form);
        form.addEventListener('submit', this.onSubmitHandlerRemove);
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
            case this.context.fields.name.name:
                isValid &= errorMessage.validateFiled(validation.checkEmptyField(value),
                    this.context.fields.name);
                break;
            case this.context.fields.email.name:
                isValid &= errorMessage.validateFiled(validation.validateEMail(value),
                    this.context.fields.email);
                break;
            case this.context.fields.password.name:
                isValid &= errorMessage.validateFiled(validation.validatePassword(value),
                    this.context.fields.password);
                break;
            case this.context.fields.repeatPassword.name:
                isValid &= errorMessage.validateFiled(validation
                    .validateRepeatPassword(data.password === data.repeatPassword),
                this.context.fields.repeatPassword);
                break;
            }
        });
        return isValid;
    }
}
