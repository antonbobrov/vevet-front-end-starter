import app from "../v/app";
import { adaptiveFont } from "../settings";

// adaptive font size

const fontSize = (function fontSize (): {
    set: Function;
    value: Function;
    } {



    // get font size
    function value (): number {

        const { viewport } = app;
        const width = viewport.size[0];
        let k = 1;

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
                else if (window.innerHeight > window.innerWidth) {
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

        // calculate

        let font = Math.floor(k * 16);
        if (app.browser === "ie") {
            font = 16;
        }
        if (font <= 13) {
            font = 14;
        }
        if (font > 22) {
            font = 22;
        }

        if (!adaptiveFont) {
            font = 16;
        }

        return font;

    }



    // set font size
    function set () {
        const font = value();
        app.html.style.fontSize = `${font}px`;
    }
    set();



    // add viewport callbacks
    app.viewport.add({
        target: "",
        do: set.bind(this),
        name: "Font Size",
    });

    app.load.add({
        do: set.bind(this),
    });



    return {
        set: set.bind(this),
        value: value.bind(this),
    };



}());

export default fontSize;
