import { PageAjaxModule } from "vevet";
import { MENU_LINKS_SELECTOR } from "../menu/vars";
import { pageSettings } from "../../settings";
import setLoadingIndicator from "../../helpers/setLoadingIndicator";

// menu selectors
const menuSelector = MENU_LINKS_SELECTOR;

// create ajax transition between pages
const pageAjax = new PageAjaxModule({
    selectors: {
        outer: ".app",
        links: ".v-al",
    },
    ajax: {
        method: "post",
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
        selectorNew: menuSelector,
        selectorOld: menuSelector,
    },
    cache: true,
});



// show loading
pageAjax.on("prepare", () => {
    setLoadingIndicator(true);
});

// hide loading
pageAjax.on("done", () => {
    setLoadingIndicator(false);
});



export default pageAjax;
