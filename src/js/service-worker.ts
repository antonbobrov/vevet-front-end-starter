/* eslint-disable no-console */
/* eslint-disable max-len */

import { isLocalHost } from './helpers/site/isLocalHost';

export const registerServiceWorker = function () {

    if (isLocalHost()) {
        return;
    }

    // This is the "Offline page" service worker
    // Check compatibility for the browser we're running this in
    if ('serviceWorker' in navigator) {

        if (navigator.serviceWorker.controller) {
            console.log('[PWA Builder] active service worker found, no need to register');
        }
        else {
            // Register the service worker
            navigator.serviceWorker
                .register('/sw.js', {
                    scope: './',
                })
                .then((reg) => {
                    console.log(`[PWA Builder] Service worker has been registered for scope: ${reg.scope}`);
                });
        }
    }
    else {
        // alert("nooo")
    }


};
