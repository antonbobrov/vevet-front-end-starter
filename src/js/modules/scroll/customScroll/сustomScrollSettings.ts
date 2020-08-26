import { ScrollModule } from 'vevet';
import { selectOne } from 'vevet-dom';
import app from '../../../v/app';
import { useCustomScroll } from '../../../settings';
import { customScroll } from './customScroll';

const { viewport } = app;



export function getEase () {

    // get easing
    let ease = 0.1;
    if (app.os === 'macos') {
        if (!viewport.mobiledevice) {
            ease = 0.2;
        }
    }
    if (app.browser === 'edge') {
        ease = 0.2;
    }

    return ease;

}



// it can be used in many modules, f.e., Vevet.View
export function getScrollSelector (): (HTMLElement | ScrollModule) {
    const selector = selectOne('#scroll') as HTMLElement;
    if (canBeCustom()) {
        const scroll = customScroll.get();
        if (scroll instanceof ScrollModule) {
            return scroll;
        }
    }
    return selector;
}



export function canBeCustom () {
    if (viewport.desktop && !viewport.mobiledevice && useCustomScroll) {
        return true;
    }
    return false;
}



export function getElementsSelector () {
    return '#scroll .scroll__outer';
}
