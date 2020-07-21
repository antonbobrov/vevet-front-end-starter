import { Application } from "vevet";

// create veevet application
const app = new Application({
    prefix: "v-",
    page: document.querySelector(".app").getAttribute("data-v-page").split(" "),
    easing: [0.85, 0.02, 0.225, 0.925],
});

// remove no transition class
app.load.add({
    do: () => {
        app.html.classList.remove("v-no-transition");
    },
});

export default app;
