import {
    selectOne, isElement, IAddEventListener, addEventListener,
} from 'vevet-dom';
import app from '../../app/app';
import { customScroll } from './custom-scroll/customScroll';
import { CustomScrollType, isCustomScroll } from './custom-scroll/isCustomScroll';
import { canBeCustom } from './custom-scroll/settings';
import { useWindowScroll } from './settings';



export interface IOnScroll {
    destroy: () => void;
}



export function onScroll (
    callback: (scrollTop: number) => void,
    /**
     * If false, the listeners will be removed when the page will be destroyed
     */
    external = false,
): IOnScroll {

    // get current page
    const page = app.vevetPage;

    // listeners
    const listeners: IAddEventListener[] = [];

    // set event on default scroll outer
    const scrollOuter = selectOne('#custom-scroll');
    if (isElement(scrollOuter)) {
        listeners.push(addEventListener(
            scrollOuter,
            'scroll',
            () => {
                if (!canBeCustom() && !useWindowScroll) {
                    callback(scrollOuter.scrollTop);
                }
            },
        ));
    }

    // set event on custom scroll
    const scrollModule = customScroll.get();
    let customScrollEvent: false | string = false;
    if (isCustomScroll(scrollModule)) {
        const mod = scrollModule as CustomScrollType;
        customScrollEvent = mod.on('update', () => {
            if (canBeCustom()) {
                callback(mod.scrollTop);
            }
        });
    }

    // set window event
    listeners.push(addEventListener(
        window,
        'scroll', () => {
            if (!canBeCustom() && useWindowScroll) {
                callback(window.pageYOffset);
            }
        }, {
            passive: false,
        },
    ));



    // remove events on page destroy
    if (!!page && !external) {
        page.on('destroy', () => {
            destroy();
        }, {
            once: true,
        });
    }



    // destroy the listeners
    function destroy () {

        listeners.forEach((event) => {
            event.remove();
        });

        if (!!customScrollEvent && !!scrollModule) {
            scrollModule.remove(customScrollEvent);
        }

    }



    return {
        destroy: destroy.bind(this),
    };

}
