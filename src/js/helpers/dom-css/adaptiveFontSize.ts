// adaptive font size

import app from '../../app/app';
import { useAdaptiveFontSize } from '../../settings';
import { boundProgress } from '../math/boundProgress';



const adaptiveFontSize = (function func () {
    let prevValue = 16;

    /**
     * Get current value
     */
    function get () {
        const multiplier = getMultiplier();
        // calculate font size
        const font = Math.round(multiplier * 16);
        return boundProgress(font, [13, 27]);
    }

    /**
     * Get font size multiplier
     */
    function getMultiplier () {
        if (!app || !useAdaptiveFontSize) {
            return 1;
        }
        const { viewport } = app;
        const {
            desktop, tablet, mobile,
            landscape, size,
        } = viewport;
        const [width, height] = size;

        if (desktop) {
            if (width < 1440) {
                return width / 1440;
            }
            if (width >= 1440 && width <= 1580) {
                return 1;
            }
            return width / 1580;
        }

        if (tablet) {
            return width / 1024;
        }

        if (mobile) {
            if (landscape) {
                return 1;
            }
            if (width > 750) {
                return width / 500;
            }
            if (width > height) {
                if (width >= 360 && width <= 400) {
                    return 1;
                }
                if (width < 360) {
                    return boundProgress(width / 360, [0.9375, Infinity]);
                }
                if (width > 400) {
                    return width / width;
                }
            }
            else if (width < 350) {
                return width / 350;
            }
            else {
                return 1;
            }
        }

        return 1;
    }



    /**
     * Update font size
     */
    function update () {
        if (!app) {
            return;
        }
        const value = get();
        if (value !== prevValue) {
            app.html.style.fontSize = `${value}px`;
            app.html.style.setProperty('--font-size', `${value}px`);
        }
        prevValue = value;
    }

    // set events
    update();
    if (app) {
        app.viewport.on('w', () => {
            update();
        }, {
            name: 'Adaptive Font Size',
        });
    }

    return {
        get,
        px: (
            val: number,
            round = false,
        ) => {
            const px = val * (get() / 16);
            return round ? Math.round(px) : px;
        },
    };
}());

export default adaptiveFontSize;
