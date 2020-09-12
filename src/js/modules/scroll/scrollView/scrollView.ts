import { ScrollViewModule, merge } from 'vevet';
import { initScrollViewParents } from './scrollViewParents';
import { getScrollSelector } from '../customScroll/сustomScrollSettings';
import { resizeTimeout } from '../../../settings';
import app from '../../../v/app';

let currentViewModule: (ScrollViewModule | false) = false;



// view module
interface ScrollView {
    get: () => false | ScrollViewModule;
    create: (prop?: ScrollViewModule.Properties) => ScrollViewModule;
    enable: Function;
}
export const scrollView: ScrollView = (function () {
    return {
        get: getView.bind(this),
        create: createView.bind(this),
        enable: enableView.bind(this),
    };
}());



function getView () {
    return currentViewModule;
}

export function createView (
    prop: ScrollViewModule.Properties = {},
) {

    // set view parents
    initScrollViewParents();

    // get settings
    const pageSettings: ScrollViewModule.Properties = {
        selectors: {
            outer: getScrollSelector(),
            elements: '*[class*="v-view"]',
            inside: false,
        },
        on: false,
        seekInit: false,
        classToAdd: 'v-viewed',
        stackDelay: 75,
        resizeTimeout,
        edge: 1,
        autostack: {
            on: true,
            delay: 1000,
        },
    };
    const settings = merge(pageSettings, prop);

    // initialize scroll view
    const view = new ScrollViewModule(settings);

    // destroy the class on page destroy
    if (app.vevetPage) {
        app.vevetPage.on('destroy', () => {
            view.destroy();
        });
    }

    // add event on resize
    // change scroll selector
    if (app.vevetPage) {
        app.vevetPage.addEvent('viewport', {
            target: 'w_',
            do: () => {
                view.changeProp({
                    selectors: {
                        outer: getScrollSelector(),
                    },
                });
            },
            name: 'Scroll View',
        });
    }

    // change var
    currentViewModule = view;

    return view;

}



function enableView () {

    const view = getView();
    if (view) {
        view.changeProp({
            on: true,
        });
        view.seek();
    }

}
