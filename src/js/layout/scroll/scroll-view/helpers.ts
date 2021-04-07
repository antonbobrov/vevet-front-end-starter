export const scrollViewClasses = [
    'v-view',
    'v-viewed',
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
