import { timeoutCallback } from 'vevet';
import { addEventListener, IAddEventListener } from 'vevet-dom';
import app from '../../app/app';

interface Data {
    el: Element;
    delay?: number;
    useOnMobile?: boolean;
    mouseenter: () => void;
    mouseleave: () => void;
}

export interface IDelayHover {
    isHovered: () => boolean;
    destroy: () => void;
}

export function setDelayHover ({
    el,
    delay = 100,
    useOnMobile = true,
    mouseenter,
    mouseleave,
}: Data): IDelayHover {
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
        if (app.viewport.mobiledevice) {
            return;
        }
        isHovered = false;
        mouseleave();
    }));

    // set events for mobile
    if (useOnMobile) {
        if (el instanceof HTMLElement) {
            el.style.userSelect = 'none';
        }

        listeners.push(addEventListener(el, 'touchstart', () => {
            if (!app.viewport.mobiledevice) {
                return;
            }
            isHovered = true;
            timeoutCallback(() => {
                if (isHovered) {
                    mouseenter();
                }
            }, delay);
        }));

        listeners.push(addEventListener(el, 'touchend', () => {
            if (!app.viewport.mobiledevice) {
                return;
            }
            isHovered = false;
            mouseleave();
        }));
    }



    return {
        isHovered: () => isHovered,
        destroy: () => {
            listeners.forEach((listener) => {
                listener.remove();
            });
        },
    };
}
