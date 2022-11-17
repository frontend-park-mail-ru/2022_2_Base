'use strict';

const basePathApi = 'api/v1/';

export const config = {
    basePath: 'https://www.reazon.ru',
    // basePath: 'http://127.0.0.1:8080',
    href: {
        main: '/',
        login: '/login',
        signup: '/signup',
        notFound: '/error404',
        logout: '/logout',
        user: '/user',
        category: '/category',
        cart: '/cart',
    },
    api: {
        login: basePathApi + 'login',
        signup: basePathApi + 'signup',
        logout: basePathApi + 'logout',
        session: basePathApi + 'session',
        products: basePathApi + 'products',
        category: basePathApi + 'products/',
        profile: basePathApi + 'user/profile',
        uploadAvatar: basePathApi + 'user/avatar',
        avatarsDir: basePathApi + 'img/avatars/',
        insertIntoCart: basePathApi + 'cart/insertintocart',
        deleteFromCart: basePathApi + 'cart/deletefromcart',
        makeOrder: basePathApi + 'cart/makeorder',
        productsByCategory: basePathApi + 'products/',
        cart: basePathApi + 'cart',

    },
    responseCodes: {
        code200: 200,
        code201: 201,
        code400: 400,
        code401: 401,
    },
};
