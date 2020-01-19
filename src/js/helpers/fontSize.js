import settings from '../settings';
import app from '../v/app';

// adaptive font size

const fontSize = (function() {



    // get font size
    function value() {

        let k = 1,
            viewport = app.viewport,
            width = viewport.size[0];

        // dekstop

        if (viewport.desktop) {
            k = width / 1440;
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
                if (width > 750) {
                    k = width / 500;
                }
                else {
                    if (window.innerHeight > window.innerWidth) {
                        k = width / 375;
                        if (width < 420) {
                            k = 1;
                        }
                    }
                    else {
                        k = 1;
                    }
                }
            }

        }

        // calculate
        
        let font = Math.floor(k * 16);
        if (app.browser == 'ie') {
            font = 16;
        }
        if (font <= 13) {
            font = 14;
        }
        if (font > 22) {
            font = 22;
        }

        if (!settings.font.adaptive) {
            font = 16;
        }

        return font;

    }



    // set font size
    let set = function() {
        let font = value();
        app.html.style.fontSize = `${font}px`;
    };
    set();


    
    // add viewport callbacks
    app.viewport.add({
        target: '',
        do: set.bind(this)
    });

    app.load.add({
        do: set.bind(this),
        value: value.bind(this)
    });



}());

export default fontSize;