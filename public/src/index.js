'use strict';

import UserPage from './pages/UserPage/UserPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import MainPage from './pages/MainPage/MainPage.js';
import RegisterPage from './pages/RegisterPage/RegisterPage.js';
import Req from './modules/ajax.js';
import RefreshEl from './modules/refreshElements.js';

const request = new Req();
const refresh = new RefreshEl(document.getElementById('root'));
refresh.refreshFooter();
const main = document.getElementById('main');
const authEvent = new CustomEvent('authEvent', {detail: 'trigger on auth'});

/**
 * Функция отрисовки страницы регистрации
 * @param {function} PageConstructor конструктор класса страницы
 * @return {object} класс страницы
 */
const renderPage = (PageConstructor) => {
    const page = new PageConstructor(main);

    return (context) => {
        page.render(context);
        return page;
    };
};

/**
 * Функция отрисовки страницы пользователя
 * @param {object} context контекст отрисовки страницы
 */


const config = {
    header: {
        main: {
            href: '/main',
            name: 'Главная',
            render: renderPage(MainPage),
        },
        login: {
            href: '/login',
            name: 'Авторизация',
            render: renderPage(LoginPage),
        },
        signup: {
            href: '/signup',
            name: 'Регистрация',
            render: renderPage(RegisterPage),
        },
        user: {
            href: '/user',
            name: 'Профиль',
            render: renderPage(UserPage),
        },
    },
    topcategory: {
        Smartphone: {
            nameCategory: 'Телефоны',
            img: './img/Smartphone.png',
        },
        Computer: {
            nameCategory: 'Компьютеры',
            img: './img/Computer.png',
        },
        Headphones: {
            nameCategory: 'Наушники',
            img: './img/Headphones.png',
        },
        TV: {
            nameCategory: 'Телевизоры',
            img: './img/TV.png',
        },
        Watch: {
            nameCategory: 'Часы',
            img: './img/Watch.png',
        },
        Tablet: {
            nameCategory: 'Планшеты',
            img: './img/Tablet.png',
        },
        Accessories: {
            nameCategory: 'Аксессуары',
            img: './img/Accessories.png',
        },
    },
    auth: {
        authorised: false,
        event: authEvent,
    },
    api: {
        login: 'api/v1/login',
        signup: 'api/v1/signup',
        logout: 'api/v1/logout',
        session: 'api/v1/session',
        products: 'api/v1/products',
    },
    userInfo: {
        userCard: {
            name: 'test',
            email: 'test',
            phone: 'test',
        },
    },
    authorised: false,
    currentPage: null,
};

config.authorised = true; // fix
config.userInfo.userCard.name = 'Имя Фамилия';
config.userInfo.userCard.email = 'email@domain.ru';
config.userInfo.userCard.phone = '7 777 777 77 77';


/**
 * Функция перехода на новую страницу
 * @param {object} event - событие, произошедшее на странице
 */
const changePage = async (event) => {
    const {target} = event;

    let href = target.getAttribute('href');

    if (href === null) {
        href = target.parentElement.getAttribute('href');
    }

    Object.keys(config.header).forEach((page) => {
        if (config.header[page].href === href) {
            event.preventDefault();
            config.currentPage.removeEventListener(config);
            config.currentPage = config.header[page].render(config);
        }
    });

    if (href === '/logout') {
        event.preventDefault();
        const [status] = await request.makeDeleteRequest(config.api.logout)
            .catch((err) => console.log(err));

        if (status === 200) {
            config.auth.authorised = false;
            window.dispatchEvent(config.auth.event);
        }
    }
    console.log(href); // fix
};

window.addEventListener('click', changePage);

const onAuthAndLogout = async () => {
    refresh.refreshHeader(config);
};

window.addEventListener('authEvent', onAuthAndLogout);

/**
 * Функция для получения сессии
 */
const checkSession = async () => {
    const [status] = await request.makeGetRequest(config.api.session).catch((err) => console.log(err));

    // config.auth.authorised = status === 200;
    config.auth.authorised = true; // fix
    window.dispatchEvent(config.auth.event);
};

window.addEventListener('DOMContentLoaded', checkSession, {once: true});
config.currentPage = config.header.main.render(config);
