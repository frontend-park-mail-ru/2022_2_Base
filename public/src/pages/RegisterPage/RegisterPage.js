import '../templates.js';
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import FormComponent from '../../components/Form/Form.js';
import FooterComponent from '../../components/Footer/Footer.js';
import Req from '../../modules/ajax.js';
import Val from '../../modules/validation.js';

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
            window.Handlebars.templates['RegisterPage.hbs'],
        );
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render(config) {
        const context = config.forms.signup;
        super.render(context);

        /* Создание и отрисовка компонента Header */
        this.headerComponent = new HeaderComponent(document.getElementById('header'));
        this.headerComponent.render(config.authorised);

        /* Создание и отрисовка компонента Form */
        this.formComponent = new FormComponent(document.getElementById('signup__form'));
        this.formComponent.render(context);

        /* Создание и отрисовка компонента Footer */
        this.footerComponent = new FooterComponent(document.getElementById('footer'));
        this.footerComponent.render();

        const form = document.getElementById('signup__form');
        const fields = context.fields;
        document.getElementById(fields.name.name).focus();

        /**
         * Функция, осуществляющая валидацию данных из формы.
         * @param {object} event - событие, произошедшее на странице
         */
        const realTimeCheckHandler = async (event) => {
            const validation = new Val();
            switch (event.target.name) {
            case 'email':
                if (document.getElementById('emailError') !== null) {
                    document.getElementById('emailError').remove();
                }
                const valEmail = validation.validateEMail(event.target.value);
                if (valEmail !== undefined && !valEmail.status) {
                    validation.getErrorMessage(document.getElementById(event.target.name),
                        'emailError', valEmail.message);
                }
                break;
            case 'password':
                if (document.getElementById('passwordError') !== null) {
                    document.getElementById('passwordError').remove();
                }
                const valPassword = validation.validatePassword(event.target.value);
                if (valPassword !== undefined && !valPassword.status) {
                    validation.getErrorMessage(document.getElementById(event.target.name),
                        'passwordError', valPassword.message);
                }
                break;
            }
        };

        /**
         * Функция, обрабатывающая посылку формы.
         * @param {object} event событие отправки формы
         */
        const onSubmitHandler = async (event) => {
            event.preventDefault();
            const data = [];
            const validation = new Val();
            Object.keys(fields).forEach(function(page) {
                const element = form.querySelector(`[name=${fields[page].name}]`);
                data.push(element.value);
            });
            if (data[data.length - 1] !== data[data.length - 2]) {
                validation.getErrorMessage(document.getElementById(fields.repeatPassword.name),
                    'repeatPasswordError', 'Введенные пароли не совпадают');
            } else {
                if (document.getElementById('repeatPasswordError') !== null) {
                    document.getElementById('repeatPasswordError').remove();
                }
            }

            //  timing email
            data[1] = data[1].trim();
            const [username, email, password, anotherPassword] = data;

            if (validation.validateRegFields(email, password, anotherPassword)) {
                const r = new Req();
                const [status] = await r.makePostRequest('api/v1/signup',
                    {password, email, username});

                switch (status) {
                case 201:
                    console.log('auth');
                    config.authorised = true;
                    form.removeEventListener('focusout', realTimeCheckHandler);
                    form.removeEventListener('submit', onSubmitHandler);
                    config.header.main.render(config);
                    break;
                case 400:
                    document.getElementById('Error400Message') === null ?
                        validation.getServerMessage(document.getElementById('inForm'),
                            'Error400Message', 'Ошибка. Попробуйте еще раз') :
                        console.log('bad request: ', status);
                    break;
                case 409:
                    validation.getErrorMessage(document.getElementById(fields.email.name),
                        'emailError', 'Почта уже занята');
                    console.log('no auth: ', status);
                    break;
                default:
                    document.getElementById('serverErrorMessage') === null ?
                        validation.getServerMessage(document.getElementById('inForm'),
                            'serverErrorMessage', 'Ошибка сервера. Попробуйте позже') :
                        console.log('server error: ', status);
                    break;
                }
            } else {
                const eventError = {
                    email: {
                        target: {
                            name: "email",
                            value: email,
                        },
                    },
                    password: {
                        target: {
                            name: "password",
                            value: password,
                        },
                    },
                }
                realTimeCheckHandler(eventError.email);
                realTimeCheckHandler(eventError.password);
            }
        };

        form.addEventListener('focusout', realTimeCheckHandler);

        form.addEventListener('submit', onSubmitHandler);
    }
}
