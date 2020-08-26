import { selectAll } from 'vevet-dom';

const viewAttr = 'data-view-parent';

export const initScrollViewParents = function () {

    const outers = selectAll(`*[${viewAttr}]`);
    for (let i = 0, l = outers.length; i < l; i++) {
        const outer = outers[i];
        if (outer instanceof HTMLElement) {
            const attr = outer.getAttribute(viewAttr);
            if (attr) {

                const { children } = outer;
                for (let a = 0; a < children.length; a++) {
                    children[a].classList.add(attr);
                }

            }
        }
    }

};
