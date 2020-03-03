import app from "../../v/app";
import scrollCanBeCustom from "./scrollCanBeCustom";

// get scroll selector
// it can be used in many modules, f.e., Vevet.View
function scrollSelector() {
    if (scrollCanBeCustom()) {
        return app.vevetPage.scroll.scroll;
    }
    else {
        return '.scroll';
    }
}

export default scrollSelector;