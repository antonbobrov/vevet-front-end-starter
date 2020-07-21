import app from "../v/app";

// calculate viewport values for css

function cssVars () {

    const { viewport } = app;

    // set
    set();
    app.load.add({
        do: set.bind(this),
    });
    viewport.add({
        target: "",
        do: set.bind(this),
        name: "CSS Vars",
    });

    // set vars
    function set () {

        const { size } = viewport;

        // viewport width
        app.html.style.setProperty("--vw", `${size[0] / 100}px`);

        // viewport height
        app.html.style.setProperty("--vh", `${size[1] / 100}px`);

    }

}

export default cssVars;
