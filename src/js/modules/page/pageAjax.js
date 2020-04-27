import { PageAjaxModule } from 'vevet';
import { pageSettings } from '../../settings';

// menu selectors
const menuSelector = '.menu a';

// create ajax transition between pages
const pageAjax = new PageAjaxModule({
    selectors: {
        outer: '.app',
        links: '.v-al'
    },
    ajax: {
        method: 'post'
    },
    timeouts: {
        load: pageSettings.load,
        update: pageSettings.update,
        done: pageSettings.done
    },
    pageChange: {
        default: pageSettings.default
    },
    changeSame: false,
    menuLinks: {
        selectorNew: menuSelector,
        selectorOld: menuSelector
    },
    cache: true
});

export default pageAjax;