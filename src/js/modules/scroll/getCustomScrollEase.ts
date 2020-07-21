import app from "../../v/app";

export default function getCustomScrollEase () {

    // get easing
    let ease = 0.1;
    if (app.os === "macos") {
        if (!app.viewport.mobiledevice) {
            ease = 0.2;
        }
    }
    if (app.browser === "edge") {
        ease = 0.2;
    }

    return ease;

}
