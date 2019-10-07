import app from '../modules/app';
import settings from '../settings';

let fontSize = (function() {



    let condition = function(width, v) {

        let k = 1;

        // dekstop

        if (v.desktop) {
            k = width / 1440;
            if (k > 1.25) {
                k = 1.25;
            }
        }
        else {

            // tablet

            if (v.tablet) {
                k = width / 1024;
            }

            // mobile

            if (v.mobile) {
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

    };



    let set = function() {

        let width = app.viewport.size[0],
            font = condition(width, app.viewport);

        app.html.style.fontSize = `${font}px`;

    };
    set();

    app.viewport.add({
        target: '',
        do: set.bind(this)
    });

    app.load.add({
        do: set.bind(this)
    });



}());

export default fontSize;