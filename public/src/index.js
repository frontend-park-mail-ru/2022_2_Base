'use strict';

import refresh from './modules/refreshElements.js';
import router from './modules/Router.js';
import '../index.scss';
import {userActions, UserActionTypes} from './actions/user.js';
import {config} from './config.js';
import userStore from './stores/UserStrore.js';

refresh.refreshFooter();
router.start(config);

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

    if (!!href && !href.includes('#')) {
        event.preventDefault();
        router.openPage(href);
    }

    if (href === config.href.logout) {
        event.preventDefault();
        userActions.logout();
    }
};

window.addEventListener('click', changePage);

userStore.addListener(() => {
    router.openPage(document.location.pathname);
    if (userStore.getContext(userStore._storeNames.responseCode) === 200) {
        refresh.onAuth();
    } else {
        refresh.refreshHeader(userStore.getContext(userStore._storeNames.isAuth));
    }
},
UserActionTypes.USER_FETCH);

userStore.addListener(() => {
    if (userStore.getContext(userStore._storeNames.responseCode) === 200) {
        refresh.onLogOut();
    }
},
UserActionTypes.USER_LOGOUT);

document.addEventListener('DOMContentLoaded', userActions.fetchUser, {once: true});

// Регистрация Service Worker
const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
            .then((registration) => {
                const data = {
                    type: 'CACHE_URLS',
                    payload: [
                        location.href,
                        ...performance.getEntriesByType('resource').map((r) => r.name),
                    ],
                };
                if (registration.installing) {
                    registration.installing.postMessage(data);
                } else if (registration.waiting) {
                    registration.waiting.postMessage(data);
                    console.log('Service worker installed');
                } else if (registration.active) {
                    registration.active.postMessage(data);
                    console.log('Service worker active');
                }
            })
            .catch((error) => console.log(`SW registration failed with ${error}`));
    } else {
        console.log('Service Workers are not supported in this browser');
    }
};

registerServiceWorker();
