const viewedClassName = 'v-viewed';

export const scrollViewClasses = [
    'v-view',
    viewedClassName,
    'v-view_b',
    'v-view_a',
];



export function includesScrollViewClass (el: Element) {
    for (let i = 0, l = scrollViewClasses.length; i < l; i++) {
        if (el.classList.contains(scrollViewClasses[i])) {
            return true;
        }
    }

    return false;
}



export function removeScrollViewClasses (
    outer: Element,
) {
    scrollViewClasses.forEach((className) => {
        outer.classList.remove(className);
    });

    const children = outer.querySelectorAll('*');
    children.forEach((child) => {
        scrollViewClasses.forEach((className) => {
            child.classList.remove(className);
        });
    });
}



export function isScrollViewed (
    el: Element,
) {
    return el.classList.contains(viewedClassName);
}



export function onScrollViewEl (
    el: Element,
    callback: () => void,
) {
    if (el.classList.contains(viewedClassName)) {
        callback();
    } else {
        // @ts-ignore
        el['v-view-callback'] = () => {
            callback();
        };
    }
}
