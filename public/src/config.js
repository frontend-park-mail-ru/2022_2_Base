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
        product: '/product',
        comment: '/comment',
    },
    api: {
        login: `${basePathApi}login`,
        signup: `${basePathApi}signup`,
        logout: `${basePathApi}logout`,
        session: `${basePathApi}session`,
        products: `${basePathApi}products`,
        profile: `${basePathApi}user/profile`,
        uploadAvatar: `${basePathApi}user/avatar`,
        avatarsDir: `${basePathApi}img/avatars/`,
        insertIntoCart: `${basePathApi}cart/insertintocart`,
        deleteFromCart: `${basePathApi}cart/deletefromcart`,
        makeOrder: `${basePathApi}cart/makeorder`,
        productsByCategory: `${basePathApi}products/`,
        cart: `${basePathApi}cart`,

    },
    states: {
        endOf: -1,
        invalidUserData: 4000,
        invalidData: 4040,
    },
    queryParams: {
        sort: {
            base: '?sort=',
            price: 'price',
            rating: 'rating',
            popular: 'popular',
        },
    },
    responseCodes: {
        code200: 200,
        code201: 201,
        code400: 400,
        code401: 401,
    },
    errorMessages: {
        ERROR_400_MESSAGE: 'Ошибка. Попробуйте еще раз',
        ERROR_401_MESSAGE: 'Неверная почта или пароль',
        SERVER_ERROR_MESSAGE: 'Ошибка сервера. Попробуйте позже',
    },
};
