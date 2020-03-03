import app from "../../v/app"
import settings from "../../settings";

const viewport = app.viewport;

export default function scrollCanBeCustom() {
    if (viewport.desktop & !viewport.mobiledevice & settings.scroll.custom) {
        return true;
    }
    return false;
}
