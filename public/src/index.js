'use strict';

import LoginPage from './pages/LoginPage/LoginPage.js';
import MainPage from './pages/MainPage/MainPage.js';
import RegisterPage from './pages/RegisterPage/RegisterPage.js';
import Req from './modules/ajax.js';
import RefreshEl from './modules/refreshElements.js';

const root = document.getElementById('root');

const renderLoginPage = (context) => {
    const loginPage = new LoginPage(root);
    loginPage.render(context);
};

const renderMainPage = (context) => {
    const mainPage = new MainPage(root);
    mainPage.render(context);
};

const renderRegisterPage = (context) => {
    const registerPage = new RegisterPage(root);
    registerPage.render(context);
};

const config = {
    header: {
        main: {
            href: '/main',
            name: 'Главная',
            render: renderMainPage,
        },
        login: {
            href: '/login',
            name: 'Авторизация',
            render: renderLoginPage,
        },
        signup: {
            href: '/signup',
            name: 'Регистрация',
            render: renderRegisterPage,
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
};

const changePage = async (event) => {
    const {target} = event;

    let href = target.getAttribute('href');

    if (href === null) {
        href = target.parentElement.getAttribute('href');
    }

    Object.keys(config.header).forEach(function(page) {
        if (config.header[page].href === href) {
            event.preventDefault();
            config.header[page].render(config);
        }
    });

    if (href === '/logout') {
        event.preventDefault();
        const r = new Req();
        const [status, username] = await r.makeDeleteRequest('api/v1/logout');

        if (status === 200) {
            console.log('logout');
            config.authorised = false;
            const refresh = new RefreshEl();
            refresh.refreshHeader(config);
            return;
        }
        console.log('no logout: ', status);
    }
};

window.addEventListener('click', changePage);

const checkSession = async () => {
    const r = new Req();
    const [status, username] = await r.makeGetRequest('api/v1/session');

    if (status === 200) {
        console.log('session');
        config.authorised = true;
        const refresh = new RefreshEl();
        refresh.refreshHeader(config);
        return;
    }
    console.log('no session: ', status);
    config.authorised = false;
};

window.addEventListener('load', checkSession, {once: true});
console.log('auth: ', config.authorised);
config.header.main.render(config);
