import { selectOne } from 'vevet-dom';
import { CustomScrollType } from './custom-scroll/isCustomScroll';
import { getScrollSelector } from './custom-scroll/settings';
import { scrollTo } from './scrollTo';



export function scrollToElement (
    el: Element,
    duration = 350,
    outer: (false | HTMLElement | CustomScrollType) = false,
) {

    // return a promise
    const promise = new Promise((resolve: (arg?: unknown) => void) => {

        let headerHeight = 0;
        const header = selectOne('.header');
        if (header) {
            headerHeight = header.clientHeight;
        }

        const bounding = el.getBoundingClientRect();
        const scroll = getScrollSelector();
        const topValue = bounding.top + scroll.scrollTop - headerHeight;

        scrollTo(topValue, duration, outer).then(() => {
            resolve();
        });

    });

    return promise;

}
