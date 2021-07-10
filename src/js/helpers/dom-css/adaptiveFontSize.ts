// adaptive font size

import app from '../../app/app';
import { useAdaptiveFontSize } from '../../settings';
import { boundProgress } from '../math/boundProgress';



interface Return {
    set: Function;
    getValue: () => number;
}

export const adaptiveFontSize = (function fontSize (): Return {

    let prevValue = 16;



    // get font size
    function getValue () {

        if (!useAdaptiveFontSize) {
            return 16;
        }

        const { viewport } = app;
        const [width, height] = viewport.size;
        let multiplier = 1;

        // dekstop
        if (viewport.desktop) {
            if (width < 1440) {
                multiplier = width / 1440;
            }
            else if (width >= 1440 && width <= 1580) {
                multiplier = 1;
            }
            else {
                multiplier = width / 1580;
            }
        }
        // tablet
        else if (viewport.tablet) {
            multiplier = width / 1024;
        }
        // mobile
        else if (viewport.mobile) {
            if (app.viewport.landscape) {
                multiplier = 1;
            }
            else if (width > 750) {
                multiplier = width / 500;
            }
            else if (width > height) {
                if (width >= 360 && width <= 400) {
                    multiplier = 1;
                }
                else if (width < 360) {
                    multiplier = boundProgress(width / 360, [0.9375, Infinity]);
                }
                else if (width > 400) {
                    multiplier = width / width;
                }
            }
            else {
                multiplier = 1;
            }
        }

        // calculate
        const font = Math.round(multiplier * 16);
        return boundProgress(font, [13, 27]);

    }



    // set font size
    function set () {
        const value = getValue();
        if (value !== prevValue) {
            app.html.style.fontSize = `${value}px`;
        }
        prevValue = value;
    }
    set();



    // add viewport callbacks
    app.viewport.add({
        target: 'w_',
        do: set.bind(this),
        name: 'Font Size',
    });

    app.load.add({
        do: set.bind(this),
    });



    return {
        set: set.bind(this),
        getValue: getValue.bind(this),
    };



}());



export function adaptivePx (
    val: number,
    round = false,
) {
    const px = val * adaptiveFontSize.getValue() / 16;
    return round ? Math.round(px) : px;
}
