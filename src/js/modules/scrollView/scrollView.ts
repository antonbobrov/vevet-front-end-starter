import { ScrollViewModule } from "vevet";
import scrollViewParents from "./scrollViewParents";
import scrollSelector from "../scroll/scrollSelector";
import { resizeTimeout } from "../../settings";
import app from "../../v/app";



let currentViewModule: (ScrollViewModule | false) = false;



// view module
interface ScrollView {
    get: () => false | ScrollViewModule;
    create: () => ScrollViewModule;
    enable: Function;
}
const scrollView: ScrollView = (function() {
    return {
        get: getView.bind(this),
        create: createView.bind(this),
        enable: enableView.bind(this)
    }
})();

export default scrollView;



function getView() {
    return currentViewModule;
}

function createView() {

    // set view parents
    scrollViewParents();

    // initialize scroll view
    const view = new ScrollViewModule({
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

    // destroy the class on page destroy
    if (app.vevetPage) {
        app.vevetPage.on("destroy", () => {
            view.destroy();
        })
    }

    // add event on resize
    // change scroll selector
    if (app.vevetPage) {
        app.vevetPage.addEvent('viewport', {
            target: 'w_',
            do: () => {
                view.changeProp({
                    selectors: {
                        outer: scrollSelector()
                    }
                });
            }
        });
    }

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