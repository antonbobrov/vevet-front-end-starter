import app from "../v/app";
import settings from "../settings";

// get scroll selector
// it can be used in many modules, f.e., Vevet.View
function scrollSelector() {
    if (settings.scroll.custom) {
        return app.vevetPage.scroll.scroll;
    }
    else {
        return '.scroll';
    }
}

export default scrollSelector;