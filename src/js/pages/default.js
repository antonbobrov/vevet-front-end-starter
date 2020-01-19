import { elements, updateElements } from '../helpers/elements';
import view from '../modules/scroll/view';
import { Page } from 'vevet';
import scroll from '../modules/scroll/scroll';
import settings from '../settings';
import fullHeight from '../helpers/fullHeight';


// scroll settings
let ss = settings.scroll;


// Default Page Class
class Default extends Page {



    create(ajax) {

        if (!super.create(ajax)) {
            return false;
        }

        // set full-height elements
        fullHeight.set();

        // scrolling
        if (ss.custom) {
            this._scroll();
        }
        this._view();

        // update page elements
        updateElements();

        return true;

    }

    show() {

        if (!super.show()) {
            return false;
        }

        // enable & update view
        this.view.changeProp({
            on: true
        });
        this.view.seek();

        // enable scroll
        if (ss.custom) {
            this.scroll.play();
        }

        // show app
        elements.app.classList.remove("hide");

        return true;

    }

    hide() {

        if (!super.hide()) {
            return false;
        }

        // stop scroll
        if (ss.custom) {
            this.scroll.pause();
        }

        // hide app
        elements.app.classList.add("hide");

        return true;

    }



    /*** Custom Scroll ***/
    
    _scroll() {
        this.scroll = scroll();
    }



    /*** View ***/

    _view() {

        this.view = view();

    }



}

new Default({
    name: 'default'
});

export default Default;