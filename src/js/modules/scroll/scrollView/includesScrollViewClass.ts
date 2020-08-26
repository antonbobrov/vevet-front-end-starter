export const scrollViewClasses = [
    'v-view',
    'v-view_b',
    'v-view_a',
];

export function includesScrollViewClass (el: HTMLElement) {

    for (let i = 0, l = scrollViewClasses.length; i < l; i++) {
        if (el.classList.contains(scrollViewClasses[i])) {
            return true;
        }
    }

    return false;

}
