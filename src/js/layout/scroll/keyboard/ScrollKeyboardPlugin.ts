import {
    Plugin, ScrollModule, timeoutCallback, domChildOf,
} from 'vevet';
import { setKeyboardTabHightlight } from './setKeyboardTabHightlight';

setKeyboardTabHightlight();

const iterator = 40;



export class ScrollKeyboardPlugin extends Plugin {

    protected _m: ScrollModule;

    protected _prevFocusItem: HTMLElement | false;


    _setEvents () {

        super._setEvents();

        this.listener(window, 'keydown', this._onkeydown.bind(this));

    }



    protected _onkeydown (e: KeyboardEvent) {

        // tab is active for everethyng, forms too
        if (e.keyCode === 9) {
            this._onTab();
            return;
        }

        // check if some element is under focus
        // if some exists, ignore key events
        const { activeElement } = document;
        if (activeElement) {
            if (
                activeElement instanceof HTMLInputElement
                || activeElement instanceof HTMLTextAreaElement
            ) {
                return;
            }
        }

        // get scroll
        const scroll = this._m;
        if (!scroll.prop.run) {
            return;
        }

        // animate
        switch (e.keyCode) {

            // down
            case 40:
                scroll.targetTop += iterator;
                break;
            // page down
            case 34:
                scroll.targetTop += iterator * 10;
                break;
            // end down
            case 35:
                scroll.targetTop = scroll.scrollHeight;
                break;

            // up
            case 38:
                scroll.targetTop -= iterator;
                break;
            // page up
            case 33:
                scroll.targetTop -= iterator * 10;
                break;
            // home
            case 36:
                scroll.targetTop = 0;
                break;

            // space
            case 32:
                scroll.targetTop += iterator * 5;
                break;

            // right
            case 39:
                scroll.targetLeft += iterator;
                break;

            // left
            case 37:
                scroll.targetLeft -= iterator;
                break;

            default:
                return;

        }

        // home
        if (e.keyCode === 36) {
            scroll.targetTop = 0;
        }

        // @ts-ignore
        scroll._boundaries(true);
        // @ts-ignore
        scroll._boundaries(false);

    }



    protected _onTab () {

        // get scroll
        const scroll = this._m;
        if (!scroll.prop.run) {
            return;
        }

        // get active element and scroll to it
        timeoutCallback(() => {

            const { activeElement } = document;
            if (activeElement instanceof HTMLElement) {

                if (!domChildOf(activeElement, scroll.outer)) {
                    return;
                }

                // get scroll values
                const { scrollTop } = scroll;
                const { scrollLeft } = scroll;

                // get bounding
                const bounding = activeElement.getBoundingClientRect();

                // get item left position in center
                const centerPosLeft = (scroll.width / 2) - (bounding.width / 2);
                const scrollLeftTarget = scrollLeft + (bounding.left - centerPosLeft);

                // get item top position in center
                const centerPosTop = (scroll.height / 2) - (bounding.height / 2);
                const scrollTopTarget = scrollTop + (bounding.top - centerPosTop);

                // apply new targets
                scroll.targetTop = scrollTopTarget;
                scroll.targetLeft = scrollLeftTarget;

                // and launch scroll animation frame
                scroll.play();

                // @ts-ignore
                scroll._boundaries(true);
                // @ts-ignore
                scroll._boundaries(false);

            }

        }, 120);

    }


}
