'use strict';

import Req from './modules/ajax.js';
import RefreshEl from './modules/refreshElements.js';
import Router from './modules/Router.js';
import '../index.scss';

const request = new Req();
const refresh = new RefreshEl(document.getElementById('root'));
refresh.refreshFooter();

const router = new Router();
export default router;

const authEvent = new CustomEvent('authEvent', {detail: 'trigger on auth'});

const config = {
    header: {
        main: {
            href: '/',
        },
        login: {
            href: '/login',
        },
        signup: {
            href: '/signup',
        },
        notFound: {
            href: '/error404',
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
    currentPage: null,
};

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
            router.openPage(href, config);
        }
    });

    if (href === '/logout') {
        event.preventDefault();
        const [status] = await request.makeDeleteRequest(config.api.logout)
            .catch((err) => console.log(err));

        if (status === 200) {
            config.auth.authorised = false;
            router.logout(config);
            window.dispatchEvent(config.auth.event);
        }
    }
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

    if (status === 200) {
        config.auth.authorised = true;
        router.login(config);
    } else {
        router.logout(config);
    }
    window.dispatchEvent(config.auth.event);
};

window.addEventListener('DOMContentLoaded', checkSession, {once: true});
router.start(config);
