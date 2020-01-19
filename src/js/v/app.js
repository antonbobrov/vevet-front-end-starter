import { Application } from "vevet";

// create veevet application
let app = new Application({
    prefix: 'v-',
    page: document.querySelector(".app").getAttribute("data-v-page").split(" "),
    // easing: 'easeInOutCubic'
});

// remove no transition class
app.load.add({
    do: () => {
        app.html.classList.remove("v-no-transition");
    }
});

export default app;