import { getScrollSelector } from '../../../modules/scroll/customScroll/сustomScrollSettings';
import { layoutElements } from '../../dom-css/layoutElements';

export function getIntersectionObserverRoot () {
    return (getScrollSelector() instanceof HTMLHtmlElement) ? null : layoutElements.app;
}
