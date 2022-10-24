const CACHE_NAME = 'base-cache-only-v1';

/**
 * Сделать Service Worker ктивным
 */
this.addEventListener('install', (event) => {
    event.waitUntil(this.skipWaiting());
});

/**
 * Записать статитечские файлы в кэш
 */
this.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            // По ключу или открываем, или создаем хранилище
            caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.addAll(event.data.payload);
                })
        )
    }
});

/**
 * Если нет интернета, достать файлы из кэша
 */
this.addEventListener('fetch', (event) => {

    event.respondWith(
        // ищем ресурс в кэше
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);
            })
    );
});
