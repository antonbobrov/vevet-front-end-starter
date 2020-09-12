import '../styles/index.scss';
import { initSite } from './initSite';
import { registerServiceWorker } from './service-worker';
import app from './v/app';

initSite();
registerServiceWorker();

// scroll to top on resize (mobile bug)
app.viewport.on('', () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}, {
    timeout: 650,
});
