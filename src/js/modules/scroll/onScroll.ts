import { ScrollModule } from 'vevet';
import { selectOne, isElement } from 'vevet-dom';
import { customScroll } from './customScroll/customScroll';

export function onScroll (
    callback: (scrollTop: number) => void,
) {

    // set event on default scroll outer
    const scrollOuter = selectOne('.scroll');
    if (isElement(scrollOuter)) {
        scrollOuter.addEventListener('scroll', () => {
            callback(scrollOuter.scrollTop);
        });
    }

    // set event on custom scroll
    const scrollModule = customScroll.get();
    if (scrollModule instanceof ScrollModule) {
        scrollModule.on('update', () => {
            callback(scrollModule.scrollTop);
        });
    }

}
