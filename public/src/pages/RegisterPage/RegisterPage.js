import '../templates.js';
import BasePage from '../BasePage.js';
import FormComponent from '../../components/Form/Form.js';
import Req from '../../modules/ajax.js';
import Val from '../../modules/validation.js';
import ErrorMessage from '../../modules/ErrorMessage.js';

const ERROR_400_MESSAGE = 'Ошибка. Попробуйте еще раз';
const ERROR_401_MESSAGE = 'Неверная почта или пароль';
const SERVER_ERROR_MESSAGE = 'Ошибка сервера. Попробуйте позже';
const REPEAT_PASSWORD_ERROR_MESSAGE = 'Введенные пароли не совпадают';

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class RegisterPage extends BasePage {
    context = {
        fields: {
            name: {
                title: 'Имя',
                type: 'text',
                name: 'name',
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
                name: 'repeat_password',
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
            window.Handlebars.templates['RegisterPage.hbs'],
        );
    }

    /**
     * Метод, удаляющий слушатели.
     * @param {any} context контекст данных для страницы
     */
    removeEventListener(context) {
        const form = document.getElementById('signup__form');
        form.removeEventListener('focusin', async (event) => {
            errorMessage.deleteErrorMessage(event.target.name);
        });
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
     * Функция, обрабатывающая посылку формы.
     * @param {object} config глобальный контекст
     * @param {object} form поля формы
     * @param {object} event событие отправки формы
     */
    async onSubmitHandler(config, form, event) {
        event.preventDefault();
        const errorMessage = new ErrorMessage();

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

        /* Проверика почты и пароля и отрисовка ошибок на странице */
        if (!this.validate(data)) {
            return;
        }

        const r = new Req();
        const [username, email, password, anotherPassword] = Array.from(data);
        const [status] = await r.makePostRequest(config.api.signup, {
            password,
            email,
            username,
        }).catch((err) => console.log(err));

        switch (status) {
        case 201:
            console.log('auth');
            config.authorised = true;
            window.dispatchEvent(config.auth.event);
            config.currentPage = config.header.main.render(config);
            removeEventListener(context);
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

        const errorMessage = new ErrorMessage();
        this.validation = new Val();
        
        form.addEventListener('focusin', this.onFocusinHandler);
        form.addEventListener('submit', this.onSubmitHandler.bind(this, config, form));
    }

    /**
     * Метод, осуществляющий валидацию данных из формы.
     * @param {object} data - объект, содержащий данные из формы
     * @return {boolean} статус валидации
     */
    validate(data) {
        const validation = new Val();
        const errorMessage = new ErrorMessage();
        const valName = validation.checkEmptyField(data.name);
        const valEmail = validation.validateEMail(data.email);
        const valPassword = validation.validatePassword(data.password);

        if (!valName.status || !valEmail.status || !valPassword.status ||
            data.password !== data.repeat_password) {
            if (valName.message !== '') {
                errorMessage.getErrorMessage(document.getElementById('name'),
                    'nameError', valName.message);
            }

            if (valEmail.message !== '') {
                errorMessage.getErrorMessage(document.getElementById('email'),
                    'emailError', valEmail.message);
            }

            if (valPassword.message !== '') {
                errorMessage.getErrorMessage(document.getElementById('password'),
                    'passwordError', valPassword.message);
            }

            if (data.password !== data.repeat_password) {
                errorMessage.getErrorMessage(document.getElementById('repeat_password'),
                    'repeat_passwordError', REPEAT_PASSWORD_ERROR_MESSAGE);
            }

            return false;
        }

        return true;
    }
}
