import LoginPage from '../pages/LoginPage/LoginPage';
import MainPage from '../pages/MainPage/MainPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import {config} from '../config';
import CartPage from '../pages/CartPage/CartPage';
import ProductPage from '../pages/ProductPage/ProductPage.js';
import CommentPage from '../pages/CommentPage/CommentPage.js';
import {userActions, UserActionTypes} from '../actions/user';
import userStore from '../stores/UserStore';
import refresh from './refreshElements';
import CategoryPage from '../pages/CatalogPage/CategoryPage/CategoryPage';
import SearchPage from '../pages/CatalogPage/SearchPage/SearchPage';

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
        this.noop = () => {};
        this.addToHistory = this.addToHistory.bind(this);

        window.addEventListener('click', this.#changePage);

        document.addEventListener('DOMContentLoaded', userActions.fetchUser, {once: true});

        userStore.addListener(() => {
            if (userStore.getContext(userStore._storeNames.responseCode) ===
                config.responseCodes.code200) {
                refresh.onAuth();
            } else {
                refresh.refreshHeader(userStore.getContext(userStore._storeNames.isAuth));
            }
            this.openPage(document.location.pathname);
        },
        UserActionTypes.USER_FETCH);

        userStore.addListener(() => {
            if (userStore.getContext(userStore._storeNames.responseCode) ===
                config.responseCodes.code200) {
                refresh.onLogOut();
            }
        },
        UserActionTypes.USER_LOGOUT);
    }

    /**
     * Функция перехода на новую страницу
     * @param {object} event - событие, произошедшее на странице
     */
    #changePage = async (event) => {
        const {target} = event;

        let href = target.getAttribute('href');

        if (href === null) {
            href = target.parentElement?.getAttribute('href');
        }

        if (!!href && !href.includes('#')) {
            event.preventDefault();
            this.openPage(href);
        }
    };


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
        this.openPage(document.location.pathname, this.noop);
    }

    /**
     * Добавляет в историю браузера.
     * @param {string} path - путь к странице
     */
    addToHistory(path) {
        window.history.pushState({page: path + (window.history.length + 1).toString()}, path, path);
        window.onpopstate = (event) => this.openPage(document.location.pathname, this.noop);
    }

    /**
     * Переходит по истории назад. Если истории нет, то на главную.
     */
    back() {
        History.length > 1 ? history.back() : this.openPage(config.href.main, this.noop);
    }

    /**
     * Запускает роутер.
     */
    start() {
        this.#mainElement = document.getElementById('main');

        this.register(config.href.main, MainPage);
        this.register(config.href.login, LoginPage);
        this.register(config.href.signup, RegisterPage);
        this.register(config.href.category, CategoryPage);
        this.register(config.href.search, SearchPage);
        this.register(config.href.cart, CartPage);
        this.register(config.href.product, ProductPage);
        this.register(config.href.comment, CommentPage);
        this.register(config.href.logout, userActions.logout);

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
     * @param {function} addToHistory - путь к странице
     * @return {boolean} - зарегистрирована ли такая страница
     */
    openPage(path, addToHistory = this.addToHistory) {
        const goToPath = (path?.slice(0, path.lastIndexOf('/')) ?
            path?.slice(0, path.lastIndexOf('/')) : path);
        this.#currentPage.removeEventListener();
        if (this.#pathToPage.has(goToPath)) {
            document.title = this.#titles.get(goToPath);
            addToHistory(path);
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
        this.openPage(config.href.notFound, this.noop);
    }
}

export default new Router();
