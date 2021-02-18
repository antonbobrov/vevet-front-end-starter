import { IOnScroll, onScroll } from '../onScroll';
import app from '../../../app/app';
import { getIntersectionObserverRoot } from './getIntersectionObserverRoot';
import { intersectionObserverSupported } from './intersectionObserverSupported';



export interface InOutViewportCallbacks {
    destroy: () => void;
}



export function setInOutViewportCallbacks (
    element: HTMLElement,
    inCallback: () => void,
    outCallback: () => void,
    threshold = 0.001,
): InOutViewportCallbacks {

    let onScrollEvents: IOnScroll | false = false;
    let observer: IntersectionObserver | false = false;

    if (intersectionObserverSupported()) {
        const options = {
            root: getIntersectionObserverRoot(),
            rootMargin: '0px',
            threshold,
        };
        observer = new IntersectionObserver(observerCallback.bind(this), options);
        observer.observe(element);
    }
    else {
        onScrollEvents = onScroll(seekBounding.bind(this));
    }



    function observerCallback (
        entries: IntersectionObserverEntry[],
    ) {

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                inCallback();
            }
            else {
                outCallback();
            }
        });

    }

    function seekBounding () {

        const bounding = element.getBoundingClientRect();
        const vSize = app.viewport.size;

        if (
            bounding.bottom <= 0
            || bounding.right <= 0
            || bounding.top >= vSize[1]
            || bounding.left >= vSize[0]
        ) {
            outCallback();
        }
        else {
            inCallback();
        }

    }



    // destroy the listeners
    function destroy () {

        if (onScrollEvents) {
            onScrollEvents.destroy();
        }

        if (observer) {
            observer.disconnect();
        }

    }



    return {
        destroy: destroy.bind(this),
    };

}
