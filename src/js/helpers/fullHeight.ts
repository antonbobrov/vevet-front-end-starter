import app from "../v/app";

// except for css, we may set full-height elements here
// both for full-height and min-full-height elements

const fullHeight = (function(): {
    set: Function;
} {

    const viewport = app.viewport;



    const set = function() {

        const size = viewport.size;

        const elements = document.querySelectorAll(".full-height");
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            if (el instanceof HTMLElement) {
                el.style.height = `${size[1]}px`;
            }
        }

        const elementsMin = document.querySelectorAll(".full-height-min");
        for (let i = 0; i < elementsMin.length; i++) {
            const el = elementsMin[i];
            if (el instanceof HTMLElement) {
                el.style.minHeight = `${size[1]}px`;
            }
        }

    };
    set();

    

    // add viewport events
    app.viewport.add({
        target: '',
        do: set.bind(this),
        name: 'Full Height'
    });

    app.load.add({
        do: set.bind(this)
    });



    return {
        set: set.bind(this)
    };



}());

export default fullHeight;