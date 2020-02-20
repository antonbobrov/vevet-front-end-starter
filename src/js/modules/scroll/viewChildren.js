import { all } from "select-el";

const viewChildren = function() {

    let outers = all(".view-children");
    outers.forEach(outer => {
        let children = outer.children;
        for (let i = 0; i < children.length; i++) {
            children[i].classList.add("v-view");
            children[i].classList.add("v-view_b");
        }
    });

};

export default viewChildren;