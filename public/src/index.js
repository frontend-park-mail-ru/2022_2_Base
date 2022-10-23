'use strict';

import UserPage from './pages/UserPage/UserPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import MainPage from './pages/MainPage/MainPage.js';
import RegisterPage from './pages/RegisterPage/RegisterPage.js';
import Req from './modules/ajax.js';
import RefreshEl from './modules/refreshElements.js';

const root = document.getElementById('root');

/**
 * Функция отрисовки страницы входа
 * @param {object} context контекст отрисовки страницы
 */
const renderLoginPage = (context) => {
    const loginPage = new LoginPage(root);
    loginPage.render(context);
};

/**
 * Функция отрисовки главной страницы
 * @param {object} context контекст отрисовки страницы
 */
const renderMainPage = (context) => {
    const mainPage = new MainPage(root);
    mainPage.render(context);
};

/**
 * Функция отрисовки страницы регистрации
 * @param {object} context контекст отрисовки страницы
 */
const renderRegisterPage = (context) => {
    const registerPage = new RegisterPage(root);
    registerPage.render(context);
};

/**
 * Функция отрисовки страницы пользователя
 * @param {object} context контекст отрисовки страницы
 */
const renderUserPage = (context) => {
    const userPage = new UserPage(root);
    userPage.render(context);
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
        user: {
            href: '/user',
            name: 'Профиль',
            render: renderUserPage,
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
    userInfo: {
        userCard: {
            name : 'test',
            email: 'test',
            phone: 'test',
        },
    },
    authorised: false,
};

const request = new Req();
const refresh = new RefreshEl();

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

    Object.keys(config.header).forEach(function (page) {
        if (config.header[page].href === href) {
            event.preventDefault();
            config.header[page].render(config);
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
    console.log(href) // fix
};

window.addEventListener('click', changePage);

/**
 * Функция для получение сессии
 */
const checkSession = async () => {
    // const [status] = await request.makeGetRequest('api/v1/session').catch((err) => console.log(err));
    // if (status === 200) {
    //     config.authorised = true;
    //     refresh.refreshHeader(config);
    //     return;
    // }
    // config.authorised = false; // fix
};

window.addEventListener('load', checkSession, {once: true});
config.header.main.render(config);
