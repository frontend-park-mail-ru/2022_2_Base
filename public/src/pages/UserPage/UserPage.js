import '../templates.js';
import BasePage from '../BasePage.js';
import HeaderComponent from '../../components/Header/Header.js';
import FormComponent from '../../components/Form/Form.js';
import FooterComponent from '../../components/Footer/Footer.js';
import Req from '../../modules/ajax.js';
import Val from '../../modules/validation.js';
import PaymentCard from "../../components/PaymentCard/PaymentCard.js";
import AddressCard from "../../components/AddressCard/AddressCard.js";

/**
 * Класс, реализующий страницу с регистрации.
 */
export default class UserPage extends BasePage {
    /**
     * Конструктор, создающий конструктор базовой страницы с нужными параметрами
     * @param {Element} parent HTML-элемент, в который будет осуществлена отрисовка
     */
    constructor(parent) {
        super(
            parent,
            window.Handlebars.templates['UserPage.hbs'],
        );
    }

    /**
     * Метод, отрисовывающий страницу.
     * @param {object} config контекст отрисовки страницы
     */
    render(config) {
        const context = config.header.user;
        context.userInfo = config.userInfo;
        super.render(context);
        console.log(context)

        /* Создание и отрисовка компонента Header */
        this.headerComponent = new HeaderComponent(document.getElementById('header'));
        this.headerComponent.render(config.authorised);

        /* Создание и отрисовка компонента Footer */
        this.footerComponent = new FooterComponent(document.getElementById('footer'));
        this.footerComponent.render();



        const paymentCard = {
            priority: true,
            number: "123456******1234",
            type: "MIR",
            expiryDate: "00/00",
            addCard: false,
        }


        this.paymentCard = new PaymentCard(document.getElementById("payment-cards-items"));
        this.paymentCard.render(paymentCard);

        const addressCard = {
            priority: true,
            city: "г. Москва",
            street: "улица Бассейная",
            house: "д. 228",
            addCard: false,
        }


        this.addressCard = new AddressCard(document.getElementById("address-cards-items"));
        this.addressCard.render(addressCard);


        /**
         * Функция, осуществляющая валидацию данных из формы.
         * @param {object} event - событие, произошедшее на странице
         */

        // const realTimeCheckHandler = async (event) => {
        //     const validation = new Val();
        //
        //     switch (event.target.name) {
        //         case 'email':
        //             const valEmail = validation.validateEMail(event.target.value);
        //             if (valEmail !== undefined && !valEmail.status) {
        //                 validation.getErrorMessage(document.getElementById(event.target.name),
        //                     'emailError', valEmail.message);
        //             } else if (!document.getElementById('emailError')) {
        //                 document.getElementById('emailError').remove();
        //             }
        //             break;
        //         case 'password':
        //             const valPassword = validation.validatePassword(event.target.value);
        //             if (valPassword !== undefined && !valPassword.status) {
        //                 validation.getErrorMessage(document.getElementById(event.target.name),
        //                     'passwordError', valPassword.message);
        //             } else if (!document.getElementById('passwordError')) {
        //                 document.getElementById('passwordError').remove();
        //             }
        //             break;
        //     }
        // };

        /**
         * Функция, обрабатывающая посылку формы.
         * @param {object} event событие отправки формы
         */
        const onSubmitHandler = async (event) => {
            event.preventDefault();
            const data = [];
            const validation = new Val();
            Object.keys(fields).forEach(function (page) {
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
            }
        };

        // form.addEventListener('focusout', realTimeCheckHandler);
        //
        // form.addEventListener('submit', onSubmitHandler);
    }
}
