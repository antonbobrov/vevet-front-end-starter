import { addEventListener } from 'vevet-dom';

export function setEnterClickListener (
    el: Element,
    callback: () => void,
) {

    el.setAttribute('role', 'button');
    el.setAttribute('aria-pressed', 'false');

    const listener = addEventListener(el, 'keyup', (e) => {
        if (e.keyCode === 13) {
            callback();
        }
    });

    return {
        destroy: () => {
            listener.remove();
        },
    };

}
