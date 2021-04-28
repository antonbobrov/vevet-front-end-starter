import { parentByTagName } from 'vevet-dom';

export function disableTabIndex (parent: Element) {

    const children = parent.querySelectorAll('*');
    for (let i = 0, l = children.length; i < l; i++) {
        if (!parentByTagName(children[i], 'button', 5)) {
            children[i].setAttribute('tabindex', '-1');
        }
    }

}

export function enableTabIndex (el: Element) {

    el.setAttribute('tabindex', '0');

}



export function disableChildrenTabIndex (outer: Element) {

    const { children } = outer;
    for (let i = 0; i < children.length; i++) {
        children[0].setAttribute('tabindex', '0');
    }

}

export function enableChildrenTabIndex (outer: Element) {

    const { children } = outer;
    for (let i = 0; i < children.length; i++) {
        children[0].setAttribute('tabindex', '-1');
    }

}

