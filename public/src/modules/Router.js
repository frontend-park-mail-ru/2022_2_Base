import LoginPage from '../pages/LoginPage/LoginPage';
import MainPage from '../pages/MainPage/MainPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import {config} from '../config';
import CartPage from '../pages/CartPage/CartPage';
import UserPage from '../pages/UserPage/UserPage';

/**
 * Класс, реализующий переход между страницами SPA.
 */
class Router {
    #pathToPage;
    #mainElement;
    #currentPage;
    #titles;

    /**
     * Конструктор роутера.
     */
    constructor() {
        this.#pathToPage = new Map();
        this.#titles = new Map();
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
     */
    refresh() {
        this.openPage(document.location.pathname);
    }

    /**
     * Функция для рендера страницы при переходе по истории браузера.
     * @param {object} event - событие на которое запустилась функция
     */
    onPopState(event) {
        this.openPage(document.location.pathname);
    }

    /**
     * Добавляет в историю браузера.
     * @param {string} path - путь к странице
     */
    addToHistory(path) {
        window.history.pushState({page: path + (window.history.length + 1).toString()}, '', path);
        window.onpopstate = (event) => this.onPopState(event);
    }

    /**
     * Запускает роутер.
     */
    start() {
        this.#mainElement = document.getElementById('main');

        this.register(config.href.main, MainPage);
        this.register(config.href.login, LoginPage);
        this.register(config.href.signup, RegisterPage);
        this.register(config.href.category, CatalogPage);
        this.register(config.href.cart, CartPage);
        this.register(config.href.user, UserPage); // fix

        this.#titles.set(config.href.main, 'Главная - Reazon');
        this.#titles.set(config.href.login, 'Вход - Reazon');
        this.#titles.set(config.href.signup, 'Регистрация - Reazon');
        this.#titles.set(config.href.user, 'Ваши данные - Reazon');
        this.#titles.set(config.href.category, '- Reazon');
        this.#titles.set(config.href.cart, 'Корзина - Reazon');

        this.#currentPage = new MainPage(this.#mainElement);
    }

    /**
     * Переходит на страницу.
     * @param {string} path - путь к странице
     * @return {boolean} - зарегистрирована ли такая страница
     */
    openPage(path) {
        let goToPath = path?.slice(0, path.lastIndexOf('/'));
        goToPath = goToPath ? goToPath : path;
        this.#currentPage.removeEventListener();
        if (this.#pathToPage.has(goToPath)) {
            document.title = this.#titles.get(goToPath);
            this.addToHistory(path);
            this.#currentPage = this.#pathToPage.get(goToPath)(config);
            return true;
        }
        this.#currentPage = this.renderPage(ErrorPage)(config);
        return false;
    }

    /**
     * Открывает страницу 404 при динамическом URL.
     */
    openNotFoundPage() {
        window.history.replaceState(
            {page: document.location.pathname + (window.history.length).toString()},
            '', document.location.pathname);
        this.openPage(config.href.notFound);
    }
}

export default new Router();
