export function disableTabIndex (parent: HTMLElement) {

    const children = parent.querySelectorAll('*');
    for (let i = 0, l = children.length; i < l; i++) {
        children[i].setAttribute('tabindex', '-1');
    }

}



export function enableTabIndex (el: HTMLElement) {

    el.setAttribute('tabindex', '0');

}



export function enableChildrenTabIndex (outer: HTMLElement) {

    const { children } = outer;
    for (let i = 0; i < children.length; i++) {
        children[0].setAttribute('tabindex', '0');
    }

}

