import { TimelineModule, ScrollModule } from 'vevet';
import { getScrollSelector } from './customScroll/сustomScrollSettings';



export function scrollTo (
    targetTop: number,
    duration = 350,
    outer: (false | HTMLElement | ScrollModule) = false,
) {

    // return a promise
    const promise = new Promise((resolve) => {

        let scrollOuter: HTMLElement | ScrollModule;
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
            if (outer instanceof ScrollModule) {
                outer.play();
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
    outer: (false | HTMLElement | ScrollModule) = false,
) {
    return scrollTo(0, duration, outer);
}
