import { viewClasses } from "../settings";

export default function includesViewClass (el: HTMLElement) {

    for (let i = 0; i < viewClasses.length; i++) {
        if (el.classList.contains(viewClasses[i])) {
            return true;
        }
    }

    return false;

}
