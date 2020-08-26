import { TimelineModule, ScrollModule } from 'vevet';
import { getScrollSelector } from './customScroll/сustomScrollSettings';

export function scrollToTop (
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

        // create a timeline
        const timeline = new TimelineModule();

        // animate progress
        timeline.on('progress', (p) => {
            if (outer instanceof ScrollModule) {
                outer.play();
            }
            scrollOuter.scrollTop = scrollTop * (1 - p.se);
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
