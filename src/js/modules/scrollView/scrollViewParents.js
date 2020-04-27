import { all } from "select-el";

const viewAttr = 'data-view-parent';

const scrollViewParents = function() {

    let outers = all(`*[${viewAttr}]`);
    outers.forEach(outer => {

        const attr = outer.getAttribute(viewAttr);
        if (attr) {

            let children = outer.children;
            for (let i = 0; i < children.length; i++) {
                children[i].classList.add(attr);
            }

        }

    });

};

export default scrollViewParents;