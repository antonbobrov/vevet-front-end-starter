import {utils} from 'vevet';

const viewChildren = function() {

    let outers = utils.elements(".view-children");
    outers.forEach(outer => {
        let children = outer.children;
        for (let i = 0; i < children.length; i++) {
            children[i].classList.add("v-view");
            children[i].classList.add("v-view_b");
        }
    });

};

export default viewChildren;