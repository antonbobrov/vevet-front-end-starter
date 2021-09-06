import { PageAjaxModule } from 'vevet';
import { pageSettings } from '../settings';
import setLoadingIndicator from '../layout/loading/indicator';

// create ajax transition between pages
const pageAjax = new PageAjaxModule({
    selectors: {
        outer: '.app',
        links: '.v-al',
    },
    ajax: {
        method: 'post',
    },
    timeouts: {
        load: pageSettings.load,
        update: pageSettings.update,
        done: pageSettings.done,
    },
    pageChange: {
        default: pageSettings.default,
    },
    changeSame: true,
    menuLinks: {
        selectorNew: '.no-element',
        selectorOld: '.no-element',
    },
    cache: true,
});
export default pageAjax;



// show loading
pageAjax.on('prepare', () => {
    setLoadingIndicator(true);
});

// hide loading
pageAjax.on('done', () => {
    setLoadingIndicator(false);
});
