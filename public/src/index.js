'use strict';

import refresh from './modules/refreshElements';
import router from './modules/Router';
import '../index.scss';

refresh.refreshFooter();
router.start();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log("EEEEE SW!")
        }).catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
