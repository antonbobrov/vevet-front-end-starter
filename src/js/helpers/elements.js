import {utils} from '../vevet/vevet';

let elements = {
    app: null,
    scroll: null,
};

let elementsUpdate = function() {
    elements.app = utils.element(".app");
    elements.scroll = utils.element(".scroll");
};

export { elements, elementsUpdate };