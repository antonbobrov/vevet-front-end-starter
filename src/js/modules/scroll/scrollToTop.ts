import { TimelineModule, ScrollModule } from "vevet";
import scrollSelector from "./scrollSelector";

export default function scrollToTop (
    duration = 350,
    outer: (false | HTMLElement | ScrollModule) = false,
) {

    let scrollOuter: HTMLElement | ScrollModule;
    if (!outer) {
        scrollOuter = scrollSelector();
    }
    else {
        scrollOuter = outer;
    }

    // get current value
    const { scrollTop } = scrollOuter;

    // animate
    const timeline = new TimelineModule();
    timeline.on("progress", (p) => {
        if (outer instanceof ScrollModule) {
            outer.play();
        }
        scrollOuter.scrollTop = scrollTop * (1 - p.se);
    });
    timeline.play({
        duration,
    });

}
