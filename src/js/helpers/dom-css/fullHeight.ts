import { selectAll } from 'vevet-dom';
import app from '../../app/app';

// except for css, we may set full-height elements here
// both for full-height and min-full-height elements

export const fullHeight = (function fullHeight (): {
    set: Function;
    } {

    const { viewport } = app;



    function set () {

        const { size } = viewport;

        const elements = selectAll('.full-height');
        for (let i = 0, l = elements.length; i < l; i++) {
            const el = elements[i];
            if (el instanceof HTMLElement) {
                el.style.height = `${size[1]}px`;
            }
        }

        const elementsMin = selectAll('.full-height-min');
        for (let i = 0, l = elementsMin.length; i < l; i++) {
            const el = elementsMin[i];
            if (el instanceof HTMLElement) {
                el.style.minHeight = `${size[1]}px`;
            }
        }

    }
    set();



    // add viewport events
    app.viewport.add({
        target: 'w_',
        do: set.bind(this),
        name: 'Full Height',
    });

    app.load.add({
        do: set.bind(this),
    });



    return {
        set: set.bind(this),
    };



}());
