import app from "../../v/app";
import { useCustomScroll } from "../../settings";

const { viewport } = app;

export default function scrollCanBeCustom () {
    if (viewport.desktop && !viewport.mobiledevice && useCustomScroll) {
        return true;
    }
    return false;
}
