import '../templates.js';
import BasePage from '../BasePage.js';
import FormComponent from '../../components/Form/Form.js';
import Req from '../../modules/ajax.js';
import Val from '../../modules/validation.js';

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
    stopEventListener(context) {
        const form = document.getElementById('signup__form');
        form.removeEventListener('focusout', this.realTimeCheckHandler);
        form.removeEventListener('submit', this.onSubmitHandler);
    }

    /**
     * Функция, осуществляющая валидацию данных из формы.
     * @param {object} event - событие, произошедшее на странице
     */
    async realTimeCheckHandler(event) {
        //  вывод сообщений об ошибке надо перенести в отдельный модуль
        const validate = (valData, errorID) => {
            if (valData !== undefined && !valData.status) {
                this.validation.getErrorMessage(document.getElementById(event.target.name),
                    errorID, valData.message);
            } else if (document.getElementById(errorID) !== null) {
                document.getElementById(errorID).remove();
            }
        };

        switch (event.target.name) {
        case this.context.fields.email.name:
            validate(this.validation.validatePassword(event.target.value), this.context.fields.password.errorID);
            break;
        case this.context.fields.password.name:
            validate(this.validation.validatePassword(event.target.value), this.context.fields.password.errorID);
        }
    };

    /**
     * Функция, обрабатывающая посылку формы.
     * @param {object} config глобальный контекст
     * @param {object} form поля формы
     * @param {object} event событие отправки формы
     */
    async onSubmitHandler(config, form, event) {
        event.preventDefault();
        const data = [];
        const {fields} = this.context;
        Object.keys(fields).forEach(function(page) {
            const element = form.querySelector(`[name=${fields[page].name}]`);
            data.push(element.value);
        });
        if (data[data.length - 1] !== data[data.length - 2]) {
            this.validation.getErrorMessage(document.getElementById(fields.repeatPassword.name),
                'repeatPasswordError', 'Введенные пароли не совпадают');
        } else {
            if (document.getElementById('repeatPasswordError') !== null) {
                document.getElementById('repeatPasswordError').remove();
            }
        }

        // timing email
        data[1] = data[1].trim();
        const [username, email, password, anotherPassword] = data;

        console.log('credentials valid', this.validation.validateRegFields(email, password));
        if (this.validation.validateRegFields(email, password, anotherPassword)) {
            const r = new Req();
            const [status] = await r.makePostRequest(config.api.signup, {
                password,
                email,
                username,
            }).catch((err) => console.log(err));

            switch (status) {
            case 201:
                console.log('auth');
                config.auth.authorised = true;
                window.dispatchEvent(config.auth.event);
                config.currentPage = config.header.main.render(config);
                form.removeEventListener('focusout', this.realTimeCheckHandler);
                form.removeEventListener('submit', this.onSubmitHandler);
                break;
                //  вывод сообщений об ошибке надо перенести в отдельный модуль
            case 400:
                document.getElementById('Error400Message') === null ?
                    this.validation.getServerMessage(document.getElementById('inForm'),
                        'Error400Message', 'Ошибка. Попробуйте еще раз') :
                    console.log('bad request: ', status);
                break;
            case 401:
                this.validation.getErrorMessage(document.getElementById(fields.email.name),
                    'emailError', 'Неверная почта или пароль');
                console.log('no auth: ', status);
                break;
            default:
                document.getElementById('serverErrorMessage') === null ?
                    this.validation.getServerMessage(document.getElementById('inForm'),
                        'serverErrorMessage', 'Ошибка сервера. Попробуйте позже') :
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

        this.validation = new Val();
        form.addEventListener('focusout', this.realTimeCheckHandler.bind(this));
        this.onSubmitHandler = this.onSubmitHandler.bind(this, config, form);
        form.addEventListener('submit', this.onSubmitHandler);
    }
}
