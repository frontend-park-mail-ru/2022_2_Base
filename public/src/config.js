'use strict';

const basePathApi = 'api/v1/';

export const config = {
    basePath: 'https://www.reazon.ru',
    //basePath: 'http://127.0.0.1:8080',
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
        logout: {
            href: '/logout',
        },
        user: {
            href: '/user',
        },
        catalog: {
            href: '/category',
        },
        cart: {
            href: '/cart',
        },
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
        avatarsdir: basePathApi + 'img/avatars/',
        insertIntoCart: basePathApi + 'insertintocart',
        deletefromcart: basePathApi + 'deletefromcart',
        productsByCategory: basePathApi + 'products/',
    },
    responseCodes: {
        code200: 200,
        code201: 201,
    },
};
