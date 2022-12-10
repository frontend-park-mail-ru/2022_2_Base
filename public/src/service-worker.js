const CACHE_NAME = 'base-v1';

const urls = [];
const imageRegRex = /.webp|.svg|.jpg|.jpeg|.gif|.png/;

/**
 * @description Подписываемся на событиие установки сервис-воркера
 */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urls)),
    );
    console.log(1); //fix
});

/**
 * @description Подписываемся на событиие активации сервис-воркера
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(enableNavigationPreload());
    // const expectedCache = Object.keys(CACHE_NAME).map((key) => CACHE_NAME[key]);

    // event.waitUntil(
    //     // Получение всех ключей из кеша
    //     caches.keys().then((cacheNames) => Promise.all(
    //         // Прохождение по всем кешированным файлам
    //         cacheNames.map((cacheName) => {
    //             if (expectedCache.indexOf(cacheName) === -1) {
    //                 return caches.delete(cacheName);
    //             }
    //             return null;
    //         }),
    //     )),
    // );
});

/**
 * @description Подписываемся на событиие получения сообщения со списком ресурсов,
 * которые надо кешировать при первом посещении страницы
 */
self.addEventListener('message', (event) => {
    console.log(2); //fix
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.addAll(event.data.payload);
                })
                .catch((error) => console.log(`Error adding to cache ${error}`)),
        );
    }
    console.log(3); //fix
});

/**
 * @description Подписываемся на событиие отправки браузером запроса к серверу
 */
self.addEventListener('fetch', (event) => {
    // if (imageRegRex.test(event.request)) {
    //     event.respondWith(cacheFirst(event));
    // } else {
    event.respondWith(networkFirst(event));
    // }
    return true;
    // Ищем ресурс в кэше
    // caches.match(event.request)
    //     .then((cachedResponse) => {
    //         if (navigator.onLine) {
    //             return fetch(event.request) // Получить данные из сети
    //                 .then((res) => {
    //                     const resClone = res.clone();
    //                     putInCache(event.request, resClone);
    //                     return res;
    //                 })
    //                 .catch((err) => console.error(err));
    //         }

    //         if (cachedResponse) {
    //             return cachedResponse; // Получить из кеша
    //         }
    //         console.log("not found")
    //         return caches.match('/error404');
    //     })
    //     .catch((err) => {
    //         console.log(err.stack || err);
    //     }),
});

/**
 * @description Первый запрос в сеть
 * @param {Event} event
 */
async function networkFirst(event) {
    const {request} = event;
    const cache = await caches.open(CACHE_NAME);
    try {
        const response = await fetch(request);

        if (navigator.onLine) {
            await cache.put(request, response.clone());
        }
        return response;
        // if (navigator.onLine) {
        //     return fetch(request) // Получить данные из сети
        //         .then((res) => {
        //             const resClone = res.clone();
        //             await cache.put(request, resClone);
        //             return res;
        //         })
        //         .catch((err) => console.error(err));
        // }
    } catch {
        // let cachedResponse;
        try {
            const cachedResponse = await cache.match(request);
            if (cachedResponse) {
                return cachedResponse;
            }
        } catch {
            const response = await event.preloadResponse;
            if (response) {
                return response;
            } else {
                return new Response(null, {status: 404, statusText: 'Not Found'});
            }
        }
        // return cachedResponse;
    }
}

/**
 * @description Первый запрос в сеть
 * @param {Event} event
 */
async function cacheFirst(event) {
    const {request} = event;
    const cache = await caches.open(CACHE_NAME);
    try {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        const response = await event.preloadResponse;
        if (response) {
            return response;
        }
        // if (navigator.onLine) {
        //     return fetch(request) // Получить данные из сети
        //         .then((res) => {
        //             const resClone = res.clone();
        //             await cache.put(request, resClone);
        //             return res;
        //         })
        //         .catch((err) => console.error(err));
        // }
    } catch {
        // let cachedResponse;
        try {
            const response = await fetch(request);

            if (navigator.onLine) {
                await cache.put(request, response.clone());
            }
            return response;
        } catch {
            return new Response(null, {status: 404, statusText: 'Not Found'});
        }
        // return cachedResponse;
    }
}

const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
    }
};

// const putInCache = async (request, response) => {
//     const cache = await caches.open(CACHE_NAME);
//     await cache.put(request, response);
// };
