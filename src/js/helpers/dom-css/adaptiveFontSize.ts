// adaptive font size

import app from '../../app/app';
import { useAdaptiveFontSize } from '../../settings';
import { boundProgress } from '../math/boundProgress';

export const fontSize = (function fontSize (): {
    set: Function;
    udateAndGetValue: Function;
    getValue: Function;
    } {


    let value = 0;



    // get font size
    function udateAndGetValue (): number {

        if (!useAdaptiveFontSize) {
            value = 16;
            return 16;
        }

        const { viewport } = app;
        const width = viewport.size[0];
        let k = 1;

        // dekstop
        if (viewport.desktop) {
            if (viewport.size[0] < 1900 && viewport.size[0] > 1440) {
                k = 1;
            }
            else if (viewport.size[0] >= 1900) {
                k = width / 1900;
            }
            else {
                k = width / 1440;
            }
            if (k > 1.25) {
                k = 1.25;
            }
        }
        else {

            // tablet
            if (viewport.tablet) {
                k = width / 1024;
            }

            // mobile
            if (viewport.mobile) {
                if (app.viewport.landscape) {
                    k = 1;
                }
                else if (width > 750) {
                    k = width / 600;
                }
                else if (window.innerHeight > window.innerWidth) {
                    k = boundProgress(width / 375, [0.9375, Infinity]);
                }
                else {
                    k = 1;
                }
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

        value = font;
        return font;

    }



    // set font size
    function set () {
        const font = udateAndGetValue();
        app.html.style.fontSize = `${font}px`;
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
        udateAndGetValue: udateAndGetValue.bind(this),
        getValue: () => value,
    };



}());
