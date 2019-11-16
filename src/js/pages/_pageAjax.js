import { PageAjax } from '../modules/vevet';
import settings from '../settings';

let pageAjax = new PageAjax({
    selectors: {
        outer: '.app',
        links: '.v-al'
    },
    ajax: {
        method: 'post'
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