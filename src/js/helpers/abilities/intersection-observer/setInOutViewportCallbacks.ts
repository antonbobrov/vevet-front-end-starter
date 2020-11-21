import { onScroll } from '../../../modules/scroll/onScroll';
import app from '../../../v/app';
import { getIntersectionObserverRoot } from './getIntersectionObserverRoot';
import { intersectionObserverSupported } from './intersectionObserverSupported';

export function setInOutViewportCallbacks (
    element: HTMLElement,
    inCallback: () => void,
    outCallback: () => void,
    threshold = 0.001,
) {

    if (intersectionObserverSupported()) {
        const options = {
            root: getIntersectionObserverRoot(),
            rootMargin: '0px',
            threshold,
        };
        const observer = new IntersectionObserver(observerCallback.bind(this), options);
        observer.observe(element);
    }
    else {
        onScroll(seekBounding.bind(this));
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

}
