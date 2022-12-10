const CACHE_NAME = 'base-v1';

const urls = [];

/**
 * @description Подписываемся на событиие установки сервис-воркера
*/
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urls)),
    );
});

/**
 * @description Подписываемся на событиие активации сервис-воркера
*/
this.addEventListener('activate', (event) => {
    const expectedCache = Object.keys(CACHE_NAME).map((key) => CACHE_NAME[key]);

    event.waitUntil(
        // Получение всех ключей из кеша
        caches.keys().then((cacheNames) => Promise.all(
            // Прохождение по всем кешированным файлам
            cacheNames.map((cacheName) => {
                if (expectedCache.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
                return null;
            }),
        )),
    );
});

/**
 * @description Подписываемся на событиие получения сообщения со списком ресурсов,
 * которые надо кешировать при первом посещении страницы
*/
self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.addAll(event.data.payload);
                })
                .catch((error) => console.log(`Error adding to cache ${error}`)),
        );
    }
});

/**
 * @description Подписываемся на событиие отправки браузером запроса к серверу
*/
self.addEventListener('fetch', (event) => {
    event.respondWith(networkFirst(event.request)
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
    );
    return true;
});

async function networkFirst(request) {
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
        let cachedResponse;
        try {
            cachedResponse = await cache.match(request);
        } catch {
            return new Response(null, { status: 404, statusText: 'Not Found' });
        }
        return cachedResponse;
    }
}

// const putInCache = async (request, response) => {
//     const cache = await caches.open(CACHE_NAME);
//     await cache.put(request, response);
// };