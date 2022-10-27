import LoginPage from '../pages/LoginPage/LoginPage.js';
import MainPage from '../pages/MainPage/MainPage.js';
import RegisterPage from '../pages/RegisterPage/RegisterPage.js';

/**
 * Класс, реализующий переход между страницами SPA.
 */
export default class Router {
    #pathToPage;
    #mainElement;
    #currentPage;
    /**
     * Конструктор роутера.
     */
    constructor() {
        this.#pathToPage = new Map();
        this.#mainElement = document.getElementById('main');
    }
    /**
     * Функция отрисовки страницы регистрации
     * @param {function} PageConstructor конструктор класса страницы
     * @return {object} класс страницы
     */
    renderPage(PageConstructor) {
        const page = new PageConstructor(this.#mainElement);

        return (context) => {
            page.render(context);
            return page;
        };
    };
    /**
     * Регистрирует страницу.
     * @param {string} path - href страницы
     * @param {function} view - страница
     */
    register(path, view) {
        this.#pathToPage.set(path, this.renderPage(view));
    }
    /**
     * Запускает роутер.
     * @param {object} config - конфиг
     * @param {object} event - конфиг
     */
    onPopState(config, event) {
        this.go(document.location.pathname, config);
    }
    /**
     * Запускает роутер.
     * @param {object} config - конфиг
     */
    start(config) {
        this.register(config.header.main.href, MainPage);
        this.register(config.header.login.href, LoginPage);
        this.register(config.header.signup.href, RegisterPage);
        this.#currentPage = this.#pathToPage.get(config.header.main.href)(config);
    }

    /**
     * Запускает роутер.
     * @param {string} path - путь страницы
     * @param {object} config - конфиг
     */
    go(path, config) {
        this.#currentPage.removeEventListener();
        this.#currentPage = this.#pathToPage.get(path)(config);
    }
    /**
     * Запускает роутер.
     * @param {string} path - путь страницы
     * @param {object} config - конфиг
     */
    openPage(path, config) {
        this.go(path, config);
        window.history.pushState({page: path + (window.history.length + 1).toString()}, path, path);
        window.onpopstate = (event) => this.onPopState(config, event);
    }
}
