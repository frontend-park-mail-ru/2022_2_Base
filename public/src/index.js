'use strict';

import refresh from './modules/refreshElements';
import router from './modules/Router';
import '../index.scss';

refresh.refreshFooter();
router.start();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                const data = {
                    type: 'CACHE_URLS',
                    payload: [
                        location.href,
                        ...performance.getEntriesByType('resource').map((r) => r.name),
                    ],
                };
                if (registration.installing) {
                    registration.installing.postMessage(data);
                } else if (registration.waiting) {
                    registration.waiting.postMessage(data);
                    console.log('Service worker installed');
                } else if (registration.active) {
                    registration.active.postMessage(data);
                    console.log('Service worker active');
                }
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
