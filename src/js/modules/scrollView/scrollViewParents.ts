import { all } from "select-el";

const viewAttr = "data-view-parent";

const scrollViewParents = function () {

    const outers = all(`*[${viewAttr}]`);
    for (let i = 0; i < outers.length; i++) {
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

export default scrollViewParents;
