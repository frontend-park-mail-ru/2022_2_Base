import '../templates.js';
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import FormComponent from '../../components/Form/Form.js';
import FooterComponent from '../../components/Footer/Footer.js';
import Req from '../../modules/ajax.js';
import Val from '../../modules/validation.js';

/**
 * Класс, реализующий страницу входа.
 */
export default class LoginPage extends BasePage {
    fields = {
        email: {
            title: 'Почта',
            type: 'email',
            name: 'email',
            placeholder: 'mail@website.com',
            maxLength: '30',
        },
        password: {
            title: 'Пароль',
            type: 'password',
            name: 'password',
            placeholder: 'Введите пароль',
            maxLength: '16',
        },
    };
    button = {
        buttonValue: 'Войти',
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
     * Функция, осуществляющая валидацию данных из формы.
     * @param {object} event - событие, произошедшее на странице
     */
    async realTimeCheckHandler(event) {
        const validation = new Val();
        console.log('realTimeCheckHandler', event);
        switch (event.target.name) {
        case 'email':
            const valEmail = validation.validateEMail(event.target.value);
            if (valEmail !== undefined && !valEmail.status) {
                validation.getErrorMessage(document.getElementById(event.target.name),
                    'emailError', valEmail.message);
            } else if (document.getElementById('emailError') !== null) {
                document.getElementById('emailError').remove();
            }
            break;
        case 'password':
            const valPassword = validation.validatePassword(event.target.value);
            if (valPassword !== undefined && !valPassword.status) {
                validation.getErrorMessage(document.getElementById(event.target.name),
                    'passwordError', valPassword.message);
            } else if (document.getElementById('passwordError') !== null) {
                document.getElementById('passwordError').remove();
            }
            break;
        }
    };

    /**
     * Функция, обрабатывающая посылку формы.
     * @param {object} event событие отправки формы
     */
    async onSubmitHandler(event) {
        const data = [];
        const validation = new Val();
        event.preventDefault();
        Object.keys(this.fields).forEach((page) => {
            const element = this.form.querySelector(`[name=${this.fields[page].name}]`);
            data.push(element.value);
        });

        // timing email
        data[0] = data[0].trim();
        const [email, password] = data;

        console.log('credentials valid', validation.validateRegFields(email, password));
        if (validation.validateRegFields(email, password)) {
            const r = new Req();
            const [status] = await r.makePostRequest('api/v1/login', {
                password,
                email,
            }).catch((err) => console.log(err));

            console.log('onSubmitHandler', status);

            switch (status) {
            case 201:
                console.log('auth');
                this.config.authorised = true;
                this.form.removeEventListener('focusout', this.realTimeCheckHandler);
                this.form.removeEventListener('submit', this.onSubmitHandler);
                this.config.header.main.render(this.config);
                break;
            case 400:
                document.getElementById('Error400Message') === null ?
                    validation.getServerMessage(document.getElementById('inForm'),
                        'Error400Message', 'Ошибка. Попробуйте еще раз') :
                    console.log('bad request: ', status);
                break;
            case 401:
                validation.getErrorMessage(document.getElementById(this.fields.email.name),
                    'emailError', 'Неверная почта или пароль');
                console.log('no auth: ', status);
                break;
            default:
                document.getElementById('serverErrorMessage') === null ?
                    validation.getServerMessage(document.getElementById('inForm'),
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
        const context = config.forms.signin;
        super.render(context);

        /* Создание и отрисовка компонента Header */
        this.headerComponent = new HeaderComponent(document.getElementById('header'));
        this.headerComponent.render(config.authorised);

        /* Создание и отрисовка компонента Form */
        this.formComponent = new FormComponent(document.getElementById('login-form'));
        this.formComponent.render(context);

        /* Создание и отрисовка компонента Footer */
        this.footerComponent = new FooterComponent(document.getElementById('footer'));
        this.footerComponent.render();

        const form = document.getElementById('login-form');
        document.getElementById(this.fields.email.name).focus();

        form.addEventListener('focusout', this.realTimeCheckHandler);
        // form.addEventListener('submit', this.onSubmitHandler.bind({config, form}));
    }
}
