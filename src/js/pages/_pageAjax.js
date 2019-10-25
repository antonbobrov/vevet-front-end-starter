import { PageAjax } from '../modules/vevet';
import app from '../modules/app';
import settings from '../settings';

let pageAjax = new PageAjax({
    v: app,
    selectors: {
        outer: '.app',
        links: '.v-al'
    },
    ajax: {
        method: process.env.NODE_ENV == 'development' ? 'get' : 'post'
    },
    timeouts: {
        load: settings.page.load,
        update: settings.page.update,
        done: settings.page.done
    },
    changeSame: false,
    cache: true
});

export default pageAjax;