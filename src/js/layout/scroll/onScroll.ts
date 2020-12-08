import {
    selectOne, isElement, IAddEventListener, addEventListener,
} from 'vevet-dom';
import app from '../../app/app';
import { customScroll } from './custom-scroll/customScroll';
import { CustomScrollType, isCustomScroll } from './custom-scroll/isCustomScroll';
import { canBeCustom } from './custom-scroll/settings';
import { useWindowScroll } from './settings';

export function onScroll (
    callback: (scrollTop: number) => void,
    /**
     * If false, the listeners will be removed when the page will be destroyed
     */
    external = false,
) {

    // get current page
    const page = app.vevetPage;

    // listeners
    const listeners: IAddEventListener[] = [];

    // set event on default scroll outer
    const scrollOuter = selectOne('#custom-scroll');
    if (isElement(scrollOuter)) {
        const event = addEventListener(
            scrollOuter,
            'scroll',
            () => {
                if (!canBeCustom() && !useWindowScroll) {
                    callback(scrollOuter.scrollTop);
                }
            },
        );
        if (!!page && !external) {
            listeners.push(event);
        }
    }

    // set event on custom scroll
    const scrollModule = customScroll.get();
    if (isCustomScroll(scrollModule)) {
        const mod = scrollModule as CustomScrollType;
        mod.on('update', () => {
            if (canBeCustom()) {
                callback(mod.scrollTop);
            }
        });
    }

    // set window event
    const windowEvent = addEventListener(
        window,
        'scroll', () => {
            if (!canBeCustom() && useWindowScroll) {
                callback(window.pageYOffset);
            }
        }, {
            passive: false,
        },
    );
    if (!!page && !external) {
        listeners.push(windowEvent);
    }

    // remove events on page destroy
    if (page) {
        page.on('destroy', () => {
            listeners.forEach((event) => {
                event.remove();
            });
        }, {
            once: true,
        });
    }

}
