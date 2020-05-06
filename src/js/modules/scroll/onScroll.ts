import { one, exists } from "select-el";
import customScroll from "./customScroll";
import { ScrollModule } from "vevet";

export default function onScroll(callback: (scrollTop: number) => void) {

    // set event on default scroll outer
    const scrollOuter = one(".scroll");
    if (exists(scrollOuter)) {
        scrollOuter.addEventListener("scroll", () => {
            callback(scrollOuter.scrollTop);
        });
    }

    // set event on custom scroll
    const scrollModule = customScroll.get();
    if (scrollModule instanceof ScrollModule) {
        scrollModule.on("update", () => {
            callback(scrollModule.scrollTop);
        });
    }

}