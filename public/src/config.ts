'use strict';

import refreshElements from './modules/refreshElements';

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
        orders: '/orders',
        product: '/product',
        comment: '/comment',
        addComment: '/addcomment',
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
        orders: `${basePathApi}cart/orders`,
        search: `${basePathApi}search`,
        suggestionSearch: `${basePathApi}suggestions`,
        makeComment: `${basePathApi}user/makecomment`,
        getComments: `${basePathApi}products/comments`,
    },
    states: {
        endOf: -1,
        noPayCardId: -1,
        noAvatar: '-1',
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
    noop: () => {},
    empyNode: document.createElement('div'),
    HTMLskeleton: {
        body: refreshElements.body,
        root: refreshElements.root,
        header: refreshElements.header,
        main: refreshElements.main,
        footer: refreshElements.footer,
    },
};
