'use strict';

const basePathApi = 'api/v1/';

export const config = {
    basePath: 'https://www.reazon.ru',
    basePathApi: basePathApi,
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
        favourites: '/user/favorites',
    },
    api: {
        login: `${basePathApi}login`,
        signup: `${basePathApi}signup`,
        logout: `${basePathApi}logout`,
        session: `${basePathApi}session`,
        products: `${basePathApi}products`,
        salesProducts: `${basePathApi}productswithdiscount`,
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
        setPromo: `${basePathApi}cart/setpromocode`,
        password: `${basePathApi}user/password`,
        recommendations: `${basePathApi}recommendations`,
        addLike: `${basePathApi}user/insertintofav`,
        removeLike: `${basePathApi}user/deletefromfav`,
        getFavorites: `${basePathApi}user/favorites`,
        getBestOffer: `${basePathApi}bestproduct/`,
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
            base: 'sort',
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
        code403: 403,
        code409: 409,
        code413: 413,
    },
    noop: () => {},
    empyNode: document.createElement('div'),
    defaultAvatar: 'img/UserPhoto.webp',
    HTMLskeleton: {
        body: document.createElement('div') as HTMLElement,
        root: document.createElement('div') as HTMLElement,
        header: document.createElement('div') as HTMLElement,
        main: document.createElement('div') as HTMLElement,
        footer: document.createElement('div') as HTMLElement,
    },
};
