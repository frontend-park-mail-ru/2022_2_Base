import HeaderComponent from '../components/Header/Header';
import FooterComponent from '../components/Footer/Footer';
import router from './Router';
import {config} from '../config';
import UserPage from '../pages/UserPage/UserPage';
import userStore from '../stores/UserStore';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

/**
 * Класс, реализующий перерендеринг элементов
 */
class RefreshEl {
    /**
     * Метод, реализующий создание тега с id
     * @param {string} tag - тег элемента для создания
     * @param {string} id - идентификатор тега
     * @return{HTMLElement} - элемент с тегом
     */
    createElementWithId(tag, id = tag) {
        const element = document.createElement(tag);
        element.id = id;
        return element;
    }

    /**
     * Создает каркас страницы
     */
    constructor() {
        const root = document.getElementById('root');
        const page = document.createElement('div');
        page.classList.add('page');
        page.appendChild(this.createElementWithId('header'));
        page.appendChild(this.createElementWithId('main'));
        page.appendChild(this.createElementWithId('footer'));

        root.appendChild(page);

        this.header = document.getElementById('header');
        this.headerComponent = new HeaderComponent(this.header);
    }

    /**
     * Метод, реализующий перерендеринг компонента Header
     * @param {boolean} isAuth - есть ли авторизация
     */
    refreshHeader(isAuth) {
        this.innerHTML = '';
        this.headerComponent.removeEventListener();
        this.headerComponent.render(isAuth);
        this.headerComponent.startEventListener();
    };

    /**
     * Метод, реализующий перерендеринг компонента Footer
     */
    refreshFooter() {
        const footer = document.getElementById('footer');
        footer.innerHTML = '';
        const footerComponent = new FooterComponent(footer);
        footerComponent.render();
    };

    /**
     * Метод, вызываемый при авторизации
     */
    onAuth() {
        router.remove(config.href.login);
        router.remove(config.href.signup);
        router.register(config.href.user, UserPage);
        this.refreshHeader(userStore.getContext(userStore._storeNames.isAuth));
    }

    /**
     * Метод, вызываемый при авторизации
     */
    onLogOut() {
        router.register(config.href.login, LoginPage);
        router.register(config.href.signup, RegisterPage);
        router.remove(config.href.user);
        router.refresh(config);
        this.refreshHeader(userStore.getContext(userStore._storeNames.isAuth));
    }
}

export default new RefreshEl();
