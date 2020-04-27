import { all } from "select-el";

export default function getCustomScrollElements() {
    return all('.scroll .scroll__outer');
}