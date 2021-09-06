import { TimelineModule } from 'vevet';
import { selectOne } from 'vevet-dom';
import { CustomScrollType, isCustomScroll } from './custom-scroll/isCustomScroll';
import { getScrollSelector } from './custom-scroll/settings';



export function scrollTo (
    targetTop: number,
    duration = 350,
    outer: (false | HTMLElement | CustomScrollType) = false,
) {
    // return a promise
    const promise = new Promise((resolve: (arg?: unknown) => void) => {
        let scrollOuter: HTMLElement | CustomScrollType;
        if (!outer) {
            scrollOuter = getScrollSelector();
        } else {
            scrollOuter = outer;
        }

        // get current value
        const { scrollTop } = scrollOuter;
        // get difference
        const diff = targetTop - scrollTop;

        // create a timeline
        const timeline = new TimelineModule();

        // animate progress
        timeline.on('progress', (p) => {
            if (isCustomScroll(outer)) {
                const mod = outer as CustomScrollType;
                mod.play();
            }
            if (scrollOuter instanceof HTMLElement && scrollOuter.tagName.toLocaleLowerCase() === 'html') {
                document.body.scrollTop = scrollTop + diff * p.se;
            }
            scrollOuter.scrollTop = scrollTop + diff * p.se;
        });

        // on animation end
        timeline.on('end', () => {
            resolve();
        });

        // launch the timeline
        timeline.play({
            duration,
            easing: [0.25, 0.1, 0.25, 1],
        });
    });

    return promise;
}



export function scrollToTop (
    duration = 350,
    outer: (false | HTMLElement | CustomScrollType) = false,
) {
    return scrollTo(0, duration, outer);
}



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

