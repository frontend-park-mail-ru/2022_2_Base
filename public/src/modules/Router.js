import LoginPage from '../pages/LoginPage/LoginPage.js';
import MainPage from '../pages/MainPage/MainPage.js';
import RegisterPage from '../pages/RegisterPage/RegisterPage.js';
import UserPage from '../pages/UserPage/UserPage.js';
import CatalogPage from '../pages/CatalogPage/CatalogPage.js';
import ErrorPage from '../pages/ErrorPage/ErrorPage.js';
import {config} from '../config.js';
import CartPage from '../pages/CartPage/CartPage.js';
import ProductPage from '../pages/ProductPage/ProductPage.js';
import CommentPage from '../pages/CommentPage/CommentPage.js';

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
     * Запускает роутер.
     */
    start() {
        this.#mainElement = document.getElementById('main');

        this.register(config.href.main, MainPage);
        // this.register(config.href.notFound, ErrorPage);
        this.register(config.href.login, LoginPage);
        this.register(config.href.signup, RegisterPage);
        this.register(config.href.user, UserPage); // remove!
        this.register(config.href.category, CatalogPage);
        this.register(config.href.cart, CartPage);
        this.register(config.href.product, ProductPage);
        this.register(config.href.comment, CommentPage);

        this.#titles.set(config.href.main, 'Главная - Reazon');
        this.#titles.set(config.href.login, 'Вход - Reazon');
        this.#titles.set(config.href.signup, 'Регистрация - Reazon');
        this.#titles.set(config.href.user, 'Ваши данные - Reazon');
        this.#titles.set(config.href.category, '- Reazon');
        this.#titles.set(config.href.cart, 'Корзина - Reazon');
        this.#titles.set(config.href.product, 'О товаре - Reazon');
        this.#titles.set(config.href.comment, 'Отзывы - Reazon');

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
            window.history.pushState({page: path + (window.history.length + 1).toString()}, '', path);
            window.onpopstate = (event) => this.onPopState(event);
            this.#currentPage = this.#pathToPage.get(goToPath)(config);
            return true;
        }
        this.#currentPage = this.renderPage(ErrorPage)(config);
        // this.openPage(config.href.notFound);
        return false;
    }
}

export default new Router();
