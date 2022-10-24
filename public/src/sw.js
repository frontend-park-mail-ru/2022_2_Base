const CACHE_NAME = 'base-cache-only-v1';

/**
 * Сделать Service Worker ктивным
 */
 self.addEventListener('install', async (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', async (event) => {
    /* Удалим устаревшии версии кэша: */
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
    );
});

/**
 * Записать статитечские файлы в кэш
 */
 self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            // По ключу или открываем, или создаем хранилище
            caches.open(CACHE_NAME)
                .then((cache) => {
                    console.log(event.data)
                    return cache.addAll(event.data.payload);
                })
        )
    }
});

/**
 * Если нет интернета, достать файлы из кэша
 */
 self.addEventListener('fetch', (event) => {

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
