import scrollCanBeCustom from "./scrollCanBeCustom";
import customScroll from "./customScroll";

// get scroll selector
// it can be used in many modules, f.e., Vevet.View
function scrollSelector() {
    const selector = '.scroll';
    if (scrollCanBeCustom()) {
        if (customScroll.get()) {
            return customScroll.get();
        }
    }
    return selector;
}

export default scrollSelector;