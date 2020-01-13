import { View } from '../../v/v';
import scrollSelector from '../../helpers/scrollSelector';
import settings from '../../settings';
import app from '../../v/app';

let view = function() {

    let v = new View({
        parent: app.vevetPage,
        selectors: {
            outer: scrollSelector(),
            elements: '.v-view',
            inside: false
        },
        on: false,
        seekInit: false,
        classToAdd: 'v-viewed',
        stackDelay: 75,
        resizeTimeout: settings.resizeTimeout,
        edge: 1,
        autostack: {
            on: true,
            delay: 1500
        }
    });

    app.viewport.on("", () => {
        v.changeProp({
            selectors: {
                outer: scrollSelector()
            }
        });
    });

    return v;

};

export default view;