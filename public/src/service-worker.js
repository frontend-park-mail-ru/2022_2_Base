const CACHE_NAME = 'base-v1';
const urls = [];
const imageRegRex = /.webp|.svg|.jpg|.jpeg|.gif|.png/;

/**
 * @description Подписываемся на событиие установки сервис-воркера
 */
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urls)),
    );
});

/**
 * @description Подписываемся на событиие активации сервис-воркера
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(enableNavigationPreload());
    event.waitUntil(self.clients.claim());
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
    if (event.request.method !== 'GET') return;
    if (imageRegRex.test(event.request)) {
        event.respondWith(cacheFirst(event));
    } else {
        event.respondWith(networkFirst(event));
    }
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
