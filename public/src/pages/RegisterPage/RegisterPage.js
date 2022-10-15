import '../templates.js';
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import FormComponent from '../../components/Form/Form.js';
import FooterComponent from '../../components/Footer/Footer.js';
import Req from '../../modules/ajax.js';
import Val from '../../modules/validation.js';
import ErrorMes from '../../modules/ErrorMessage.js';

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
         * Функция, обрабатывающая посылку формы.
         * @param {object} event событие отправки формы
         */
        const onSubmitHandler = async (event) => {
            event.preventDefault();
            const validation = new Val();
            const errorMessage = new ErrorMes();

            /*Сохранить данные из формы в переменную*/
            const data = {};
            Object.keys(fields).forEach(function(page) {
                const element = form.querySelector(`[name=${fields[page].name}]`);
                data[fields[page].name] = element.value;
            });

            //  timing email
            data.email = data.email.trim();
            
            //Удаление отрисованных ошибок
            for (const key in data) {
                if (document.getElementById(key + 'Error') !== null) {
                    document.getElementById(key + 'Error').remove();
                }
            }

            if (!this.validate(data)) {
                return;
            }

            const r = new Req();
            const [username, email, password, anotherPassword] = Array.from(data);
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
                    errorMessage.getServerMessage(document.getElementById('inForm'),
                        'Error400Message', 'Ошибка. Попробуйте еще раз') :
                    console.log('bad request: ', status);
                break;
            case 409:
                errorMessage.getErrorMessage(document.getElementById(fields.email.name),
                    'emailError', 'Почта уже занята');
                console.log('no auth: ', status);
                break;
            default:
                document.getElementById('serverErrorMessage') === null ?
                    errorMessage.getServerMessage(document.getElementById('inForm'),
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
        const errorMessage = new ErrorMes();
        
        const valName = validation.checkEmptyField(data.name);
        const valEmail = validation.validateEMail(data.email);
        const valPassword = validation.validatePassword(data.password);

        if (!valName.status || !valEmail.status || !valPassword.status || data.password !== data.repeatPassword) {
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

            if (data.password !== data.repeatPassword) {
                errorMessage.getErrorMessage(document.getElementById('repeatPassword'),
                    'repeatPasswordError', 'Введенные пароли не совпадают');
            }

            return false;
        }

        return true;
    }
}
