import {utils} from 'vevet';

// layout elements

// storage
let elements = {
    app: null,
    scroll: null,
};


// update elements in the storage
function updateElements() {
    elements.app = utils.element(".app");
    elements.scroll = utils.element(".scroll");
}

export { elements, updateElements };