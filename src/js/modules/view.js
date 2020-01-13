import { View } from '../vevet/vevet';
import scrollSelector from '../helpers/scrollSelector';
import settings from '../settings';
import app from '../vevet/app';

let view = function(selector = scrollSelector()) {

    let v = new View({
        parent: app.vevetPage,
        selectors: {
            outer: selector,
            elements: '.v-view',
            inside: false
        },
        seekLoad: false,
        seekInit: false,
        classToAdd: 'v-viewed',
        stackDelay: 75,
        resizeTimeout: settings.resizeTimeout,
        edge: 1,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    selectors: {
                        outer: selector
                    }
                }
            },
            {
                breakpoint: 'md',
                settings: {
                    selectors: {
                        outer: selector
                    }
                }
            }
        ]
    });

    return v;

};

export default view;