import { selectOne } from 'vevet-dom';
import app from '../../../app/app';
import { useCustomScroll, useWindowScroll } from '../settings';
import { customScroll } from './customScroll';
import { CustomScrollType, isCustomScroll } from './isCustomScroll';

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
export function getScrollSelector (): (HTMLElement | CustomScrollType) {
    if (useWindowScroll) {
        return app.html;
    }
    if (canBeCustom()) {
        const scroll = customScroll.get();
        if (isCustomScroll(scroll)) {
            return scroll as CustomScrollType;
        }
    }
    const selector = selectOne('#custom-scroll') as HTMLElement;
    return selector;

}



export function canBeCustom () {
    if (!viewport.mobile && !viewport.mobiledevice && useCustomScroll) {
        return true;
    }
    return false;
}



export function getElementsSelector () {
    return '#custom-scroll .custom-scroll__outer';
}
