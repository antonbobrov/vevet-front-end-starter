import settings from '../../settings';
import { PageAjax } from 'vevet';

// settings for pages
const ps = settings.page;

// menu selectors
const menuSelector = '.menu a';

// create ajax transition between pages
const pageAjax = new PageAjax({
    selectors: {
        outer: '.app',
        links: '.v-al'
    },
    ajax: {
        method: 'post'
    },
    timeouts: {
        load: ps.load,
        update: ps.update,
        done: ps.done
    },
    changeSame: false,
    menuLinks: {
        selectorNew: menuSelector,
        selectorOld: menuSelector
    },
    cache: true
});

export default pageAjax;