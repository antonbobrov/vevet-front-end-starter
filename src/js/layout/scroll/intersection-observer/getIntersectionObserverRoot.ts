import { getScrollSelector } from '../custom-scroll/settings';
import { layoutElements } from '../../../helpers/dom-css/layoutElements';

export function getIntersectionObserverRoot () {
    return (getScrollSelector() instanceof HTMLHtmlElement) ? null : layoutElements.app;
}
