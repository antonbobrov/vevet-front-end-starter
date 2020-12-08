import { TimelineModule } from 'vevet';
import { CustomScrollType, isCustomScroll } from './custom-scroll/isCustomScroll';
import { getScrollSelector } from './custom-scroll/settings';



export function scrollTo (
    targetTop: number,
    duration = 350,
    outer: (false | HTMLElement | CustomScrollType) = false,
) {

    // return a promise
    const promise = new Promise((resolve) => {

        let scrollOuter: HTMLElement | CustomScrollType;
        if (!outer) {
            scrollOuter = getScrollSelector();
        }
        else {
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
            scrollOuter.scrollTop = scrollTop + diff * p.se;
        });

        // on animation end
        timeline.on('end', () => {
            resolve();
        });

        // launch the timeline
        timeline.play({
            duration,
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
