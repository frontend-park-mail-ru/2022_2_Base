'use strict';

export const config = {
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
    },
    api: {
        login: 'api/v1/login',
        signup: 'api/v1/signup',
        logout: 'api/v1/logout',
        session: 'api/v1/session',
        products: 'api/v1/products',
        profile: 'api/v1/profile',
    },
};
