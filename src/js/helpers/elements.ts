import { one } from "select-el";

// storage
interface Elements {
    app: null | HTMLElement;
    scroll: null | HTMLElement;
}
const elements: Elements = {
    app: null,
    scroll: null,
};


// update elements in the storage
function updateElements() {
    elements.app = one(".app");
    elements.scroll = one(".scroll");
}

export { elements, updateElements };