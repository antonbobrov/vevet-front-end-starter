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
        let k = 1;

        // dekstop
        if (viewport.desktop) {
            if (width < 1440) {
                k = width / 1440;
            }
            else if (width >= 1440 && width <= 1920) {
                k = 1;
            }
            else {
                k = width / 1920;
            }
        }
        // tablet
        else if (viewport.tablet) {
            k = width / 1024;
        }
        // mobile
        else if (viewport.mobile) {
            if (app.viewport.landscape) {
                k = 1;
            }
            else if (width > 750) {
                k = width / 500;
            }
            else if (width > height) {
                if (width >= 360 && width <= 400) {
                    k = 1;
                }
                else if (width < 360) {
                    k = boundProgress(width / 360, [0.9375, Infinity]);
                }
                else if (width > 400) {
                    k = width / width;
                }
            }
            else {
                k = 1;
            }
        }

        // calculate

        let font = Math.floor(k * 16);
        if (app.browser === 'ie') {
            font = 16;
        }
        if (font <= 13) {
            font = 14;
        }
        if (font > 22) {
            font = 22;
        }

        return font;

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
