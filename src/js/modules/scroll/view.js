import scrollSelector from './scrollSelector';
import settings from '../../settings';
import app from '../../v/app';
import { ScrollViewModule } from 'vevet';
import viewChildren from './viewChildren';


// settings for the view
const vs = settings.view;


// the module lets elements animate when they appear into the viewport
function view() {


    // view children
    viewChildren();

    // initialize view
    let v = new ScrollViewModule({
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
        autostack: vs.autostack
    });



    // add event on resize
    const viewportID = app.viewport.on("", () => {
        v.changeProp({
            selectors: {
                outer: scrollSelector()
            }
        });
    });

    app.vevetPage.on("hide", () => {
        app.viewport.remove(viewportID);
    });



    return v;


    
}

export default view;