import { one, all } from "select-el";

// layout elements

// storage
let elements = {
    app: null,
    scroll: null,
};


// update elements in the storage
function updateElements() {
    elements.app = one(".app");
    elements.scroll = all(".scroll");
}

export { elements, updateElements };