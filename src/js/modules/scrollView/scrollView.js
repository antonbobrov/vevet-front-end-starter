import { ScrollViewModule } from "vevet";
import scrollViewParents from "./scrollViewParents";
import app from "../../v/app";
import scrollSelector from "../scroll/scrollSelector";
import { resizeTimeout } from "../../settings";



let currentViewModule = false;

// view module
const scrollView = (function() {

    return {
        get: getView.bind(this),
        create: createView.bind(this),
        enable: enableView.bind(this)
    }

})();

export default scrollView;



/**
 * @returns { ScrollViewModule | false } Returns the initialized module or false.
 */
function getView() {
    return currentViewModule;
}

/**
 * @returns { ScrollViewModule | false } Returns the initialized module or false.
 */
function createView() {

    // set view parents
    scrollViewParents();

    // initialize scroll view
    const view = new ScrollViewModule({
        parent: app.vevetPage,
        selectors: {
            outer: scrollSelector(),
            elements: `*[class*="v-view"]`,
            inside: false
        },
        on: false,
        seekInit: false,
        classToAdd: 'v-viewed',
        stackDelay: 75,
        resizeTimeout: resizeTimeout,
        edge: 1,
        autostack: {
            on: true,
            delay: 1000
        }
    });

    // add event on resize
    // change scroll selector
    app.vevetPage._addEvent('viewport', {
        target: 'w_',
        do: () => {
            view.changeProp({
                selectors: {
                    outer: scrollSelector()
                }
            });
        }
    });

    // change var
    currentViewModule = view;

    return view;

}



function enableView() {

    const view = getView();
    if (view) {
        view.changeProp({
            on: true
        });
        view.seek();
    }

}