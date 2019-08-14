import { Page, Scroll, View } from '../modules/vevet';
import app from '../modules/app';
import height from '../helpers/height';
import elements from '../helpers/elements';



class Default extends Page {



    // Create the page

    create(ajax) {

        super.create(ajax);

        // set full height
        height.set();

        // show/hide elements
        this._elements();

        // scrolling
        this._scroll();
        this._view();

    }

    // Show the page

    show() {

        super.show();

        // enable scroll
        this.scrollPlay();

        // update view
        this.view._changeProp();

        // show app
        elements.get().app.classList.remove("hide");

        // show contents
        elements.get().scroll.classList.remove("hide");

    }

    // Hide the page

    hide() {

        super.hide();

        // stop scroll
        this._scrollPause();

        // hide app
        elements.get().app.classList.add("hide");

    }

    // Destroy the page

    destroy() {

        super.destroy();

        // scroll
        this.scroll.destroy();

    }



    /*** Custom Scroll ***/

    _scroll() {

        let k = .1;
        if (app.os == 'macos') {
            k = .2;
        }

        // get selector

        let selector = '.scroll .scroll__outer';

        // initialize scroll
        
        this.scroll = new Scroll({
            selectors: {
                outer: '.scroll',
                elements: selector
            },
            k: {
                value: k,
            },
            drag: {
                on: true,
                k: 2,
                reset: false,
                disableListeners: false,
                timeoutListeners: 10,
                min: 1
            },
            resizeTimeout: 500,
            run: false,
            resizeOnUpdate: false
        });

    }

    _scrollPause() {

        this.scroll.changeProp({
            run: false
        });

    }

    scrollPlay() {

        this.scroll.changeProp({
            run: true
        });

    }



    /*** View ***/

    _view() {

        this.view = new View({
            selectors: {
                outer: '.scroll',
                elements: '.v-view',
                inside: false
            },
            seekLoad: false,
            seekInit: false,
            classToAdd: 'v-viewed',
            stackDelay: 75,
            event: false,
            resizeTimeout: 1000,
        });

        this.add({
            target: 'show',
            do: () => {
                this.view.seek();
            }
        });

        this.scroll.add({
            target: 'update',
            do: () => {
                this.view.seek();
            }
        });

    }



    /*** Show/Hide Elements ***/

    _elements() {

        let el = elements.get();

        // make logo non-active on home page
        // if (this.name == 'home') {
        //     el.logo.style.pointerEvents = 'none';
        // }
        // else {
        //     el.logo.style.pointerEvents = '';
        // }

    }



}

new Default({
    name: 'default'
});

export default Default;