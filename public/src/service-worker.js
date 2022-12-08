const CACHE_NAME = 'base-v1';

const urls = [];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urls)),
    );
});

this.addEventListener('activate', (event) => {
    const expectedCache = Object.keys(CACHE_NAME).map((key) => CACHE_NAME[key]);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
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
 * @description Подписываемся на событиие отправки браузером запроса к серверу
*/
self.addEventListener('fetch', (event) => {
    event.respondWith(() => {
        const cache = caches.open(CACHE_NAME);
        try {
            if (navigator.onLine) {
                return fetch(event.request) // Получить данные из сети
                    .then((res) => {
                        const resClone = res.clone();
                        putInCache(event.request, resClone);
                        return res;
                    })
                    .catch((err) => console.error(err));
            }
        } catch {
            let cached;
            try {
                cached = await cache.match(event.request);
            } catch {
                return new Response(null, { status: 404, statusText: 'Not Found' });
            }
            return cached;
        }
    }
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
});

const putInCache = async (request, response) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response);
};