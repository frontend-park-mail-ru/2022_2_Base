import HeaderComponent from '../components/Header/Header';
import FooterComponent from '../components/Footer/Footer';
import router from './Router';
import {config} from '../config';
import userStore from '../stores/UserStore';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

/**
 * Класс, реализующий перерендеринг элементов
 */
class RefreshEl {
    body: HTMLElement;
    root: HTMLElement;
    header: HTMLElement;
    main: HTMLElement;
    footer: HTMLElement;
    headerComponent: HeaderComponent;
    /**
     * Метод, реализующий создание тега с id
     * @param tag - тег элемента для создания
     * @param id - идентификатор тега
     * @returns элемент с тегом
     */
    createElementWithId(tag: string, id = tag) {
        const element = document.createElement(tag);
        element.id = id;
        return element;
    }

    /**
     * Создает каркас страницы
     */
    constructor() {
        const page = document.createElement('div');
        this.body = document.getElementById('body') ?? page;
        this.root = document.getElementById('root') ?? page;
        page.classList.add('page');
        this.header = this.createElementWithId('header');
        this.main = this.createElementWithId('main');
        this.footer = this.createElementWithId('footer');
        page.appendChild(this.header);
        page.appendChild(this.main);
        page.appendChild(this.footer);
        this.root.appendChild(page);
        this.headerComponent = new HeaderComponent(this.header);
    }

    /**
     * Метод, реализующий перерендеринг компонента Header
     * @param isAuth - есть ли авторизация
     */
    refreshHeader(isAuth: boolean) {
        this.header.innerHTML = '';
        this.headerComponent.removeEventListener();
        this.headerComponent.render(isAuth);
        this.headerComponent.startEventListener();
    }

    /**
     * Метод, реализующий перерендеринг компонента Footer
     */
    refreshFooter() {
        this.footer.innerHTML = '';
        const footerComponent = new FooterComponent(this.footer);
        footerComponent.render();
    }

    /**
     * Метод, вызываемый при загрузке страницы,
     * к которой может получить доступ только авторизированный пользователь
     * @param data - данные для отображения
     */
    showUnAuthPage(data: {text: string, linkToPage: string, linkText: string, textAfterLink: string } ) {
        this.main.innerHTML = `
            <div class="paint-background"></div>
            <div id="content-unAuth-page-redirect"
                <span class="text-normal-large-normal main_empty">
                ${data.text}&nbsp
                <a href=${data.linkToPage} class="link">${data.linkText}</a>
                ${data.textAfterLink}
                </span>
            </div>
            <div class="paint-background"></div>`;
    }

    /**
     * Метод, вызываемый при авторизации
     */
    onAuth() {
        router.remove(config.href.login);
        router.remove(config.href.signup);
        this.refreshHeader(userStore.getContext(userStore._storeNames.isAuth));
    }

    /**
     * Метод, вызываемый при авторизации
     */
    onLogOut() {
        router.register(config.href.login, LoginPage);
        router.register(config.href.signup, RegisterPage);
        router.refresh();
        this.refreshHeader(userStore.getContext(userStore._storeNames.isAuth));
    }
}

export default new RefreshEl();
