'use strict';

const basePathApi = 'api/v1/';

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
        catalogPage: {
            href: '/catalogPage',
        },
    },
    api: {
        login: basePathApi + 'login',
        signup: basePathApi + 'signup',
        logout: basePathApi + 'logout',
        session: basePathApi + 'session',
        products: basePathApi + 'products',
        profile: basePathApi + 'profile',
        uploadAvatar: basePathApi + 'avatar',
        insertIntoCart: basePathApi + 'insertintocart',
        deletefromcart: basePathApi + 'deletefromcart',
        productsByCategory: basePathApi + 'products/',
    },
};
