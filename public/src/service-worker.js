const CACHE_NAME = `base-${new Date()}`;
const urls = [];
const imageRegRex = /.webp|.svg|.jpg|.jpeg|.gif|.png/;

/**
 * Подписываемся на событие установки сервис воркера
 */
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urls)),
    );
});

/**
 * Удаляет запись кеша
 */
const deleteCache = async (key) => {
    await caches.delete(key);
};

/**
 * Удаляет старый кеш
 */
const deleteOldCaches = async () => {
    const cacheKeepList = [CACHE_NAME];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
};

/**
 * Подписываемся на событие активации сервис воркера
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(deleteOldCaches());
    event.waitUntil(self.clients.claim());
});

/**
 * Подписываемся на событие отправки браузером запроса к серверу
 */
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
        return;
    }
    if (imageRegRex.test(event.request) && !event.request.path.includes('avatar')) {
        event.respondWith(cacheFirst(event));
    } else {
        event.respondWith(networkFirst(event));
    }
});

/**
 * Первый запрос в сеть
 * @param {Event} event - событие, вызвавшее обработчик
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
    } catch {
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
    }
}

/**
 * Первый запрос в сеть
 * @param {Event} event - событие, вызвавшее обработчик
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
    } catch {
        try {
            const response = await fetch(request);

            if (navigator.onLine) {
                await cache.put(request, response.clone());
            }
            return response;
        } catch {
            return new Response(null, {status: 404, statusText: 'Not Found'});
        }
    }
}
const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
    }
};
