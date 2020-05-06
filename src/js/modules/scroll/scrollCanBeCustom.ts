import app from "../../v/app"
import { useCustomScroll } from "../../settings";

const viewport = app.viewport;

export default function scrollCanBeCustom() {
    if (viewport.desktop && !viewport.mobiledevice && useCustomScroll) {
        return true;
    }
    return false;
}
