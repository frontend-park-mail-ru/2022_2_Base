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
        product: '/product',
        comment: '/comment',
    },
    api: {
        login: basePathApi + 'login',
        signup: basePathApi + 'signup',
        logout: basePathApi + 'logout',
        session: basePathApi + 'session',
        products: basePathApi + 'products',
        category: basePathApi + 'products/',
        profile: basePathApi + 'profile',
        uploadAvatar: basePathApi + 'avatar',
        avatarsDir: basePathApi + 'img/avatars/',
        insertIntoCart: basePathApi + 'insertintocart',
        productsByCategory: basePathApi + 'products/',
        cart: basePathApi + 'cart',
        deleteFromCart: basePathApi + 'deletefromcart',
        makeOrder: basePathApi + 'makeorder',

    },
    responseCodes: {
        code200: 200,
        code201: 201,
    },
};
