const CACHE_NAME = 'base-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

this.addEventListener('activate', (event) => {
    const expectedCacheNames = Object.keys(CACHE_NAME).map((key) => CACHE_NAME[key]);

    // Delete out of date cahes
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (expectedCacheNames.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
                return null;
            }),
        )),
    );
});

// /**
//  * @description Подписываемся на событиие получения сообщения со списком ресурсов,
//  * которые надо кешировать при первом посещении страницы
// */
// self.addEventListener('message', (event) => {
//     if (event.data.type === 'CACHE_URLS') {
//         event.waitUntil(
//             caches.open(CACHE_NAME)
//                 .then((cache) => {
//                     return cache.addAll(event.data.payload);
//                 })
//                 .catch((error) => console.log(`Error adding to cache ${error}`)),
//         );
//     }
// });

/**
 * @description Подписываемся на событиие отправки браузером запроса к серверу
*/
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // Ищем ресурс в кэше
        caches.match(event.request)
            .then((cachedResponse) => {
                if (navigator.onLine) {
                    return fetch(event.request) // Получить данные из сети
                        .then((res) => {
                            const resClone = res.clone();
                            putInCache(event.request, resClone);
                            return res;
                        })
                        .catch((err) => console.error(err));
                }

                if (cachedResponse) {
                    return cachedResponse; // Получить из кеша
                }

                const init = { // Создать пустой запрос
                    status: 418,
                    statusText: 'Offline Mode',
                };
                const data = {message: 'Content is not available in offline mode'};
                const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
                return new Response(blob, init);
            })
            .catch((err) => {
                console.log(err.stack || err);
            }),
    );
});

const putInCache = async (request, response) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response);
};