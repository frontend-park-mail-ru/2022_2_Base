import HeaderComponent from '../components/Header/Header.js';
import FooterComponent from '../components/Footer/Footer.js';
import router from './Router.js';
import {config} from '../config.js';
import UserPage from '../pages/UserPage/UserPage.js';
import userStore from '../stores/UserStrore.js';
import LoginPage from '../pages/LoginPage/LoginPage.js';
import RegisterPage from '../pages/RegisterPage/RegisterPage.js';

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
    }

    /**
     * Метод, реализующий перерендеринг компонента Header
     * @param {boolean} auth - контекст отрисовки компонента
     */
    refreshHeader(auth) {
        const header = document.getElementById('header');
        header.innerHTML = '';
        const headerComponent = new HeaderComponent(header);
        headerComponent.render(auth);
        auth ? headerComponent.startEventListener() :
            headerComponent.removeEventListener();
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
        router.remove(config.header.login.href);
        router.remove(config.header.signup.href);
        router.register(config.header.user.href, UserPage);
        console.log('isAuth', userStore.getContext(userStore._storeNames.isAuth));
        this.refreshHeader(userStore.getContext(userStore._storeNames.isAuth));
    }

    /**
     * Метод, вызываемый при авторизации
     */
    onLogOut() {
        router.register(config.header.login.href, LoginPage);
        router.register(config.header.signup.href, RegisterPage);
        router.remove(config.header.user.href);
        router.refresh(config);
        this.refreshHeader(userStore.getContext(userStore._storeNames.isAuth));
    }
}

export default new RefreshEl();
