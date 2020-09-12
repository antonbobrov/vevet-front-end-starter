import { selectOne } from 'vevet-dom';

// storage
interface Elements {
    app: Element;
    page: Element;
    scroll: Element;
}
export const layoutElements: Elements = {
    app: null,
    page: null,
    scroll: null,
};


// update elements in the storage
export function updateLayoutElements () {
    layoutElements.app = selectOne('#app');
    layoutElements.page = selectOne('#page');
    layoutElements.scroll = selectOne('#scroll');
}

updateLayoutElements();
