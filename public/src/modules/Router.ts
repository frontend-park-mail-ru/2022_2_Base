import LoginPage from '../pages/LoginPage/LoginPage';
import MainPage from '../pages/MainPage/MainPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import {config} from '../config';
import CartPage from '../pages/CartPage/CartPage';
import OrdersPage from '../pages/OrdersPage/OrdersPage';
import {userActions, UserActionTypes} from '../actions/user';
import userStore from '../stores/UserStore';
import refresh from './refreshElements';
import CategoryPage from '../pages/CatalogPage/CategoryPage/CategoryPage';
import SearchPage from '../pages/CatalogPage/SearchPage/SearchPage';
import ProductPage from '../pages/ItemPage/ProductPage/ProductPage';
import CommentPage from '../pages/ItemPage/CommentPage/CommentPage';
import AddCommentPage from '../pages/ItemPage/AddCommentPage/AddCommentPage';
import UserPage from '../pages/UserPage/UserPage';
import {CustomPages} from '../../../types/aliases';
import errorMessage from './ErrorMessage';

/**
 * Класс, реализующий переход между страницами SPA.
 */
class Router {
    #pathToPage: Map<string, CustomPages>;
    #mainElement: HTMLElement | null;
    #currentPage: CustomPages;
    #titles: Map<string, string>;

    /**
     * Конструктор роутера.
     */
    constructor() {
        this.#pathToPage = new Map();
        this.#titles = new Map();
        this.#mainElement = null;
        this.addToHistory = this.addToHistory.bind(this);

        window.addEventListener('click', this.#changePage);

        document.addEventListener('DOMContentLoaded', userActions.fetchUser, {once: true});

        window.addEventListener('offline',
            () => errorMessage.getAbsoluteErrorMessage('Отсутствует подключение к интернету'));

        userStore.addListener(() => {
            if (userStore.getContext(userStore._storeNames.isAuth)) {
                refresh.onAuth();
            } else {
                refresh.refreshHeader(userStore.getContext(userStore._storeNames.isAuth));
            }
            this.openWithCustomHistoryPage(document.location.pathname,
                document.location.pathname + document.location.search);
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
     * @param event - событие, произошедшее на странице
     */
    #changePage = async (event: Event) => {
        const {target} = event;
        if (target instanceof HTMLElement) {
            let href = target.getAttribute('href');

            if (!href) {
                href = target.parentElement?.getAttribute('href') ?? null;
            }

            if (!!href && !href.includes('#')) {
                event.preventDefault();
                this.openPage(href);
            }

            if (href === config.href.logout) {
                event.preventDefault();
                userActions.logout();
            }
        }
    };


    /**
     * Функция отрисовки страницы
     * @param PageConstructor - конструктор класса страницы
     * @returns класс страницы
     */
    renderPage(PageConstructor: CustomPages) {
        const page = new PageConstructor(this.#mainElement);

        return (context: object) => {
            page.render(context);
            return page;
        };
    }

    /**
     * Регистрирует страницу.
     * @param path - путь к странице
     * @param view - страница
     */
    register(path: string, view: CustomPages) {
        this.#pathToPage.set(path, this.renderPage(view));
    }

    /**
     * Удаляет страницу.
     * @param path - путь к странице
     */
    remove(path: string) {
        this.#pathToPage.delete(path);
    }

    /**
     * Обновляет страницу.
     */
    refresh() {
        this.openPage(document.location.pathname, config.noop);
    }

    /**
     * Добавляет в историю браузера.
     * @param path - путь к странице
     */
    addToHistory(path: string) {
        window.history.pushState({page: path + (window.history.length + 1).toString()}, path, path);
        window.onpopstate = (event) => this.openPage(document.location.pathname, config.noop);
    }

    /**
     * Переходит по истории назад. Если истории нет, то на главную.
     */
    back() {
        History.length > 2 ? history.back() : this.openPage(config.href.main, config.noop);
    }

    /**
     * Запускает роутер.
     */
    start() {
        this.#mainElement = document.getElementById('main') ?? config.emptyNode;

        this.register(config.href.main, MainPage);
        this.register(config.href.login, LoginPage);
        this.register(config.href.signup, RegisterPage);
        this.register(config.href.category, CategoryPage);
        this.register(config.href.search, SearchPage);
        this.register(config.href.cart, CartPage);
        this.register(config.href.product, ProductPage);
        this.register(config.href.comment, CommentPage);
        this.register(config.href.addComment, AddCommentPage);
        this.register(config.href.orders, OrdersPage);
        this.register(config.href.user, UserPage);

        this.#titles.set(config.href.main, 'Главная - Reazon');
        this.#titles.set(config.href.login, 'Вход - Reazon');
        this.#titles.set(config.href.signup, 'Регистрация - Reazon');
        this.#titles.set(config.href.user, 'Ваши данные - Reazon');
        this.#titles.set(config.href.category, '- Reazon');
        this.#titles.set(config.href.search, '- Reazon');
        this.#titles.set(config.href.cart, 'Корзина - Reazon');
        this.#titles.set(config.href.orders, 'Заказы - Reazon');
        this.#titles.set(config.href.product, '- Reazon');
        this.#titles.set(config.href.comment, '- Отзывы, Reazon');
        this.#titles.set(config.href.addComment, '- Отзыв, Reazon');

        this.#currentPage = new MainPage(config.HTMLskeleton.main);
    }

    /**
     * Переходит на страницу.
     * @param path - путь к странице
     * @param pathForHistory - путь который надо проставить в браузере
     */
    openWithCustomHistoryPage(path: string, pathForHistory: string) {
        this.addToHistory(pathForHistory);
        this.openPage(path, config.noop);
    }

    /**
     * Переходит на страницу.
     * @param path - путь к странице
     * @param addToHistory - путь к странице
     * @returns зарегистрирована ли такая страница
     */
    openPage(path: string, addToHistory = this.addToHistory) {
        document.documentElement.scrollTop = 0;
        const goToPath = this.#pathToPage.has(path) ? path :
            (path?.slice(0, path.lastIndexOf('/')) ?
                path?.slice(0, path.lastIndexOf('/')) : path);
        this.#currentPage.removeEventListener();
        if (this.#pathToPage.has(goToPath)) {
            document.title = this.#titles.get(goToPath) ?? 'Reazon';
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
        this.openPage(config.href.notFound, config.noop);
    }
}

export default new Router();
