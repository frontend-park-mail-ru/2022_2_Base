import '../templates.js';
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import FormComponent from '../../components/Form/Form.js';
import FooterComponent from '../../components/Footer/Footer.js';
import Req from '../../modules/ajax.js';
import Val from '../../modules/validation.js';
import ErrorMes from '../../modules/ErrorMessage.js';

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
            window.Handlebars.templates['LoginPage.hbs'],
        );
    }

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
        const fields = context.fields;
        document.getElementById(fields.email.name).focus();

        const errorMessage = new ErrorMes();

        /**
         * Функция, обрабатывающая посылку формы.
         * @param {object} event событие отправки формы
         */
        const onSubmitHandler = async (event) => {
            event.preventDefault();

            /* Сохранить данные из формы в переменную */
            const data = {};
            Object.keys(fields).forEach((page) => {
                const element = form.querySelector(`[name=${fields[page].name}]`);
                data[fields[page].name] = element.value;
            });

            // timing email
            data.email = data.email.trim();

            // Удаление отрисованных ошибок
            for (const key in data) {
                if (item.hasOwnProperty(key)) {
                    errorMessage.deleteErrorMessage(key);
                }
            }

            /* Проверика почты и пароля и отрисовка ошибок на странице */
            if (!this.validate(data)) {
                return;
            }

            const r = new Req();
            const [email, password] = Array.from(data);
            const [status] = await r.makePostRequest('api/v1/login', {password, email}).
                catch((err) => console.log(err));

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
                    errorMessage.getServerMessage(document.getElementById('inForm'),
                        'Error400Message', 'Ошибка. Попробуйте еще раз') :
                    console.log('bad request: ', status);
                break;
            case 401:
                errorMessage.getErrorMessage(document.getElementById(fields.email.name),
                    'emailError', 'Неверная почта или пароль');
                console.log('no auth: ', status);
                break;
            default:
                !document.getElementById('serverErrorMessage') ?
                    errorMessage.getServerMessage(document.getElementById('inForm'),
                        'serverErrorMessage', 'Ошибка сервера. Попробуйте позже') :
                    console.log('server error: ', status);
                break;
            }
        };

        form.addEventListener('focusin', async (event) => {
            errorMessage.deleteErrorMessage(event.target.name);
        });

        form.addEventListener('submit', onSubmitHandler);
    }

    /**
     * Метод, осуществляющий валидацию данных из формы.
     * @param {object} data - объект, содержащий данные из формы
     * @return {boolean} статус валидации
     */
    validate(data) {
        const validation = new Val();
        const errorMessage = new ErrorMes();

        const valEmail = validation.validateEMail(data.email);
        const valPassword = validation.validatePassword(data.password);

        if (!valEmail.status || !valPassword.status) {
            if (valEmail.message !== '') {
                errorMessage.getErrorMessage(document.getElementById('email'),
                    'emailError', valEmail.message);
            }

            if (valPassword.message !== '') {
                errorMessage.getErrorMessage(document.getElementById('password'),
                    'passwordError', valPassword.message);
            }

            return false;
        }
        return true;
    }
}
