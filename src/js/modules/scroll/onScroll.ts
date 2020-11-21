import { selectOne, isElement } from 'vevet-dom';
import { useWindowScroll } from '../../settings';
import { customScroll } from './customScroll/customScroll';
import { CustomScrollType, isCustomScroll } from './customScroll/isCustomScroll';
import { canBeCustom } from './customScroll/сustomScrollSettings';

export function onScroll (
    callback: (scrollTop: number) => void,
) {

    // set event on default scroll outer
    const scrollOuter = selectOne('#custom-scroll');
    if (isElement(scrollOuter)) {
        scrollOuter.addEventListener('scroll', () => {
            if (!canBeCustom() && !useWindowScroll) {
                callback(scrollOuter.scrollTop);
            }
        });
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
    window.addEventListener('scroll', () => {
        if (!canBeCustom() && useWindowScroll) {
            callback(window.pageYOffset);
        }
    }, {
        passive: false,
    });

}
