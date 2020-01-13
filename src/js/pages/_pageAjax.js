import { PageAjax } from '../v/v';
import settings from '../settings';

const pageAjax = new PageAjax({
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
    menuLinks: {
        selectorNew: '.menu a',
        selectorOld: '.menu a'
    },
    cache: true
});

export default pageAjax;