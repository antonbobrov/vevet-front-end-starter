import app from "../modules/app";

function cssVars() {

    let viewport = app.viewport;

    // set
    set();
    app.load.add({
        do: set.bind(this)
    });
    viewport.add({
        target: '',
        do: set.bind(this)
    });

    // set vars
    function set() {

        let size = viewport.size;

        // viewport width
        app.html.style.setProperty('--vw', size[0] / 100 + "px");

        // viewport height
        app.html.style.setProperty('--vh', size[1] / 100 + "px");

    }

}

export default cssVars;