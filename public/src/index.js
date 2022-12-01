'use strict';

import refresh from './modules/refreshElements';
import router from './modules/Router';
import '../index.scss';

refresh.refreshFooter();
router.start();

// // Регистрация Service Worker
// const registerServiceWorker = () => {
//     if ('serviceWorker' in navigator) {
//         navigator.serviceWorker.register('/sw.js', {scope: '/'})
//             .then((registration) => {
//                 const data = {
//                     type: 'CACHE_URLS',
//                     payload: [
//                         location.href,
//                         ...performance.getEntriesByType('resource').map((r) => r.name),
//                     ],
//                 };
//                 if (registration.installing) {
//                     registration.installing.postMessage(data);
//                 } else if (registration.waiting) {
//                     registration.waiting.postMessage(data);
//                     console.log('Service worker installed');
//                 } else if (registration.active) {
//                     registration.active.postMessage(data);
//                     console.log('Service worker active');
//                 }
//             })
//             .catch((error) => console.log(`SW registration failed with ${error}`));
//     } else {
//         console.log('Service Workers are not supported in this browser');
//     }
// };
//
// registerServiceWorker();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('SW registered: ', registration);
        }).catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
