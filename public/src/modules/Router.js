import LoginPage from '../pages/LoginPage/LoginPage.js';
import MainPage from '../pages/MainPage/MainPage.js';
import RegisterPage from '../pages/RegisterPage/RegisterPage.js';
import ErrorPage from '../pages/ErrorPage/ErrorPage.js';

/**
 * Класс, реализующий переход между страницами SPA.
 */
class Router {
    #pathToPage;
    #mainElement;
    #currentPage;

    /**
     * Конструктор роутера.
     */
    constructor() {
        this.#pathToPage = new Map();
    }

    /**
     * Функция отрисовки страницы
     * @param {object} PageConstructor конструктор класса страницы
     * @return {object} класс страницы
     */
    renderPage(PageConstructor) {
        if (PageConstructor instanceof Function && typeof PageConstructor === 'function') {
            const page = new PageConstructor(this.#mainElement);

            return (context) => {
                page.render(context);
                return page;
            };
        }
    };

    /**
     * Регистрирует страницу.
     * @param {string} path - путь к странице
     * @param {object} view - страница
     */
    register(path, view) {
        this.#pathToPage.set(path, this.renderPage(view));
    }

    /**
     * Удаляет страницу.
     * @param {string} path - путь к странице
     */
    remove(path) {
        this.#pathToPage.delete(path);
    }

    /**
     * Обновляет страницу.
     * @param {object} config - данные для отображения страницы
     */
    refresh(config) {
        this.go(document.location.pathname, config);
    }

    /**
     * Функция для рендера страницы при переходе по истории браузера.
     * @param {object} config - данные для отображения страницы
     * @param {object} event - событие на которое запустилась функция
     */
    onPopState(config, event) {
        this.go(document.location.pathname, config);
    }

    /**
     * Запускает роутер.
     * @param {object} config - данные для отображения страницы
     */
    start(config) {
        this.#mainElement = document.getElementById('main');

        this.register(config.header.main.href, MainPage);
        this.register(config.header.notFound.href, ErrorPage);
        this.register(config.header.login.href, LoginPage);
        this.register(config.header.signup.href, RegisterPage);

        this.#currentPage = new MainPage(this.#mainElement);
    }

    /**
     * Переходит на страницу.
     * @param {string} path - путь к странице
     * @param {object} config - данные для отображения страницы
     * @return {boolean} - зарегистрирована ли такая страница
     */
    go(path, config) {
        if (this.#pathToPage.has(path)) {
            this.#currentPage.removeEventListener();
            this.#currentPage = this.#pathToPage.get(path)(config);
            return true;
        }
        this.go(config.header.notFound.href, config);
        return false;
    }

    /**
     * Переходит на страницу и добавляет в историю браузера.
     * @param {string} path - путь к странице
     * @param {object} config - данные для отображения страницы
     */
    openPage(path, config) {
        if (this.go(path, config)) {
            window.history.pushState({page: path + (window.history.length + 1).toString()}, path, path);
            window.onpopstate = (event) => this.onPopState(config, event);
        }
    }
}

export default new Router();
