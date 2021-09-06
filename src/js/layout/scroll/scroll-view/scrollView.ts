import { ScrollViewModule, merge, ScrollModule } from 'vevet';
import initScrollViewParents from './scrollViewParents';
import { getScrollSelector } from '../custom-scroll/settings';
import { resizeTimeout } from '../../../settings';
import app from '../../../app/app';
import updateThings from '../../../app/updateThings';
import { IDestroyable } from '../../../commonTypes';

let currentViewModule: (ScrollViewModule | false) = false;
let updateThingsCallback: IDestroyable | false;



// view module
interface ScrollView {
    get: () => false | ScrollViewModule;
    create: (prop?: ScrollViewModule.Properties) => ScrollViewModule;
    enable: Function;
}
export const scrollView: ScrollView = (function func () {
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

    // get scroll outer
    const scrollOuter = getScrollSelector() as (HTMLElement | ScrollModule);

    // get settings
    const pageSettings: ScrollViewModule.Properties = {
        selectors: {
            outer: (scrollOuter instanceof HTMLHtmlElement) ? window : scrollOuter,
            elements: '*[class*="v-view"]:not([data-view-ignore])',
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

    // update things
    updateThingsCallback = updateThings.add(() => {
        view.updateEl();
        view.seek();
    });

    // destroy the class on page destroy
    if (app.vevetPage) {
        app.vevetPage.on('destroy', () => {
            view.destroy();
            if (updateThingsCallback) {
                updateThingsCallback.destroy();
                updateThingsCallback = false;
            }
        });
    }

    // add event on resize
    // change scroll selector
    if (app.vevetPage) {
        app.vevetPage.addEvent('viewport', {
            target: 'w_',
            do: () => {
                const selector = getScrollSelector() as (HTMLElement | ScrollModule);
                view.changeProp({
                    selectors: {
                        outer: (selector instanceof HTMLHtmlElement) ? window : selector,
                    },
                });
            },
            name: 'Scroll View',
            timeout: 50,
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
