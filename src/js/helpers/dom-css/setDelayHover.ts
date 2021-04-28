import { timeoutCallback } from 'vevet';
import { addEventListener, IAddEventListener } from 'vevet-dom';
import app from '../../app/app';

interface Data {
    el: Element;
    delay: number;
    mouseenter: () => void;
    mouseleave: () => void;
}

export function setDelayHover ({
    el,
    delay,
    mouseenter,
    mouseleave,
}: Data) {

    // states
    let isHovered = false;
    const listeners: IAddEventListener[] = [];

    // set mouseenter
    listeners.push(addEventListener(el, 'mouseenter', () => {
        if (app.viewport.mobiledevice) {
            return;
        }
        isHovered = true;
        timeoutCallback(() => {
            if (isHovered) {
                mouseenter();
            }
        }, delay);
    }));

    // set mouseleave
    listeners.push(addEventListener(el, 'mouseleave', () => {
        isHovered = false;
        mouseleave();
    }));



    return {
        destroy: () => {
            listeners.forEach((listener) => {
                listener.remove();
            });
        },
    };

}
