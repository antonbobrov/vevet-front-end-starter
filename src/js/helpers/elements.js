import {utils} from '../v/v';

let elements = {
    app: null,
    scroll: null,
};

let elementsUpdate = function() {
    elements.app = utils.element(".app");
    elements.scroll = utils.element(".scroll");
};

export { elements, elementsUpdate };