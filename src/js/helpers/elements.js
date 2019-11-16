import {utils} from '../modules/vevet';

let elements = {
    logo: null,
    app: null,
    scroll: null,
};

let elementsUpdate = function() {
    elements.logo = utils.element(".header-logo");
    elements.app = utils.element(".app");
    elements.scroll = utils.element(".scroll");
};

export { elements, elementsUpdate };