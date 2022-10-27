const CACHE_NAME = 'base-v1';

self.addEventListener('install', async (event) => {
    console.log('Service worker installing');
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
                .catch((error) => console.log(`Error adding to cache ${error}`));
        );
    }
});

/**
 * @description Подписываемся на событиие отправки браузером запроса к серверу
*/
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // Ищем ресурс в кэше
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                const responseFromNetwork = fetch(event.request);
                putInCache(event.request, responseFromNetwork.clone());
                return responseFromNetwork;
            })
    );
});

const putInCache = async (request, response) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response);
};
