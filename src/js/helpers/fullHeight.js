import app from "../v/app";

// except for css, we may set full-height elements here
// both for full-height and min-full-height elements

let fullHeight = (function() {

    let viewport = app.viewport;



    let set = function() {

        let size = viewport.size;

        let el = document.querySelectorAll(".full-height");
        for (let i = 0; i < el.length; i++) {
            el[i].style.height = `${size[1]}px`;
        }

        let elMin = document.querySelectorAll(".full-height-min");
        for (let i = 0; i < elMin.length; i++) {
            elMin[i].style.minHeight = `${size[1]}px`;
        }

    };
    set();

    

    // add viewport events
    app.viewport.add({
        target: '',
        do: set.bind(this)
    });

    app.load.add({
        do: set.bind(this)
    });



    return {
        set: set.bind(this)
    };



}());

export default fullHeight;