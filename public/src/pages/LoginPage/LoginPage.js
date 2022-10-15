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

        /**
         * Функция, обрабатывающая посылку формы.
         * @param {object} event событие отправки формы
         */
        const onSubmitHandler = async (event) => {
            const validation = new Val();
            event.preventDefault();

            /*Сохранить данные из формы в переменную*/
            const data = {};
            Object.keys(fields).forEach((page) => {
                const element = form.querySelector(`[name=${fields[page].name}]`);
                data[fields[page].name] = element.value;
            });

            // timing email
            data.email = data.email.trim();

            //Удаление отрисованных ошибок
            for (const key in data) {
                if (document.getElementById(key + 'Error') !== null) {
                    document.getElementById(key + 'Error').remove();
                }
            }

            /* Проверика почты и пароля и отрисовка ошибок на странице */
            if (!this.validate(data)) {
                return;
            }

            const r = new Req();
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
                    validation.getServerMessage(document.getElementById('inForm'),
                        'Error400Message', 'Ошибка. Попробуйте еще раз') :
                    console.log('bad request: ', status);
                break;
            case 401:
                validation.getErrorMessage(document.getElementById(fields.email.name),
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
        };

        form.addEventListener('focusin', this.DeleteErrorMessage);

        form.addEventListener('submit', onSubmitHandler);
    }

    /**
     * Метод, удаляющий сообщение об ошибке при фокусе на поле ввода
     * @param {object} event событие фокусирования на элементе
     */
    async DeleteErrorMessage(event) {
        console.log(event);

        if (document.getElementById(event.target.name + 'Error') !== null) {
            document.getElementById(event.target.name + 'Error').remove();
        }
    }

    /**
     * Метод, осуществляющий валидацию данных из формы.
     * @param {object} data - объект, содержащий данные из формы
     * @return {boolean} статус валидации
     */
    validate(data) {
        const validation = new Val();
        
        const valEmail = validation.validateEMail(data.email);
        const valPassword = validation.validatePassword(data.password);

        if (!valEmail.status || !valPassword.status) {
            if (valEmail.message !== '') {
                validation.getErrorMessage(document.getElementById('email'),
                     'emailError', valEmail.message);
            }

            if (valPassword.message !== '') {
                validation.getErrorMessage(document.getElementById('password'),
                     'passwordError', valPassword.message);
            }

            return false;
        }
        return true;
    }
}
