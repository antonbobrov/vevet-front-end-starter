import { selectOne } from 'vevet-dom';

// storage
interface Elements {
    app: Element;
    page: Element;
    customScroll: Element;
}
export const layoutElements: Elements = {
    app: null,
    page: null,
    customScroll: null,
};


// update elements in the storage
export function updateLayoutElements () {
    layoutElements.app = selectOne('#app');
    layoutElements.page = selectOne('#page');
    layoutElements.customScroll = selectOne('#custom-scroll');
}

updateLayoutElements();
