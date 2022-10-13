'use strict';

import LoginPage from './pages/LoginPage/LoginPage.js';
import MainPage from './pages/MainPage/MainPage.js';
import RegisterPage from './pages/RegisterPage/RegisterPage.js';
import Req from './modules/ajax.js';
import RefreshEl from './modules/refreshElements.js';

const root = document.getElementById('root');

/**
 * Функция отрисовки страницы регистрации
 * @param {function} PageConstructor конструктор класса страницы
 * @return {object} класс страницы
 */
const renderPage = (PageConstructor) => {
    const page = new PageConstructor(root);

    return (context) => {
        page.render(context);
        return page;
    };
};

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
    forms: {
        signin: {
            fields: {
                email: {
                    title: 'Почта',
                    type: 'email',
                    name: 'email',
                    placeholder: 'mail@website.com',
                    maxlenght: '30',
                },
                password: {
                    title: 'Пароль',
                    type: 'password',
                    name: 'password',
                    placeholder: 'Введите пароль',
                    maxlenght: '16',
                },
            },
            button: {
                buttonValue: 'Войти',
            },
        },
        signup: {
            fields: {
                name: {
                    title: 'Имя',
                    type: 'text',
                    name: 'name',
                    placeholder: 'Введите имя',
                    maxlenght: '30',
                },
                email: {
                    title: 'Почта',
                    type: 'email',
                    name: 'email',
                    placeholder: 'mail@website.com',
                    maxlenght: '30',
                },
                password: {
                    title: 'Пароль',
                    type: 'password',
                    name: 'password',
                    placeholder: 'Придумайте пароль',
                    maxlenght: '16',
                },
                repeatPassword: {
                    title: 'Повторить пароль',
                    type: 'password',
                    name: 'repeat_password',
                    placeholder: 'Повторите пароль',
                    maxlenght: '16',
                },
            },
            button: {
                buttonValue: 'Зарегистрироваться',
            },
        },
    },
    authorised: false,
    currentPage: null,
};

const request = new Req();
const refresh = new RefreshEl();

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
            //  config.currentPage.stopEventListener();
            config.currentPage = config.header[page].render(config);
        }
    });

    if (href === '/logout') {
        event.preventDefault();
        const [status] = await request.makeDeleteRequest('api/v1/logout').catch((err) => console.log(err));

        if (status === 200) {
            config.authorised = false;
            refresh.refreshHeader(config);
        }
    }
};

window.addEventListener('click', changePage);

/**
 * Функция для получения сессии
 */
const checkSession = async () => {
    const [status] = await request.makeGetRequest('api/v1/session').catch((err) => console.log(err));
    if (status === 200) {
        config.authorised = true;
        refresh.refreshHeader(config);
        return;
    }
    config.authorised = false;
};

window.addEventListener('load', checkSession, {once: true});
config.currentPage = config.header.main.render(config);
