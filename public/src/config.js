'use strict';

const basePathApi = 'api/v1/';

export const config = {
    basePath: 'https://www.reazon.ru',
    href: {
        main: '/',
        login: '/login',
        signup: '/signup',
        notFound: '/error404',
        logout: '/logout',
        user: '/user',
        category: '/category',
        cart: '/cart',
        search: '/search',
    },
    api: {
        login: `${basePathApi}login`,
        signup: `${basePathApi}signup`,
        logout: `${basePathApi}logout`,
        session: `${basePathApi}session`,
        products: `${basePathApi}products`,
        category: `${basePathApi}category`,
        profile: `${basePathApi}user/profile`,
        uploadAvatar: `${basePathApi}user/avatar`,
        avatarsDir: `${basePathApi}img/avatars/`,
        insertIntoCart: `${basePathApi}cart/insertintocart`,
        deleteFromCart: `${basePathApi}cart/deletefromcart`,
        makeOrder: `${basePathApi}cart/makeorder`,
        cart: `${basePathApi}cart`,
        search: `${basePathApi}search`,
        suggestionSearch: `${basePathApi}suggestions`,
    },
    states: {
        endOf: -1,
    },
    errorMessages: {
        error400auth: 'Ошибка. Попробуйте еще раз',
        error401auth: 'Неверная почта или пароль',
    },
    queryParams: {
        sort: {
            base: '?sort=',
            priceUp: 'priceup',
            priceDown: 'pricedown',
            ratingUp: 'ratingup',
            ratingDown: 'ratingdown',
            popularUp: 'popularup',
            popularDown: 'populardown',
        },
    },
    responseCodes: {
        code200: 200,
        code201: 201,
        code400: 400,
        code401: 401,
    },
};
