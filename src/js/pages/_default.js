import { Page, Scroll, utils } from '../modules/vevet';
import app from '../modules/app';
import settings from '../settings';
import height from '../helpers/height';
import { elementsUpdate, elements } from '../helpers/elements';
import view from '../modules/view';



class Default extends Page {



    create(ajax) {

        if (!super.create(ajax)) {
            return false;
        }

        // set full height
        height.set();

        // show/hide elements
        this._elements();

        // scrolling
        this._scroll();
        this._view();

        return true;

    }

    show() {

        if (!super.show()) {
            return false;
        }

        // update view
        this.view.updateEl();
        this.view.seek();

        // enable scroll
        this.scrollPlay();

        // show app
        elements.app.classList.remove("hide");

        return true;

    }

    hide() {

        if (!super.hide()) {
            return false;
        }

        // stop scroll
        this.scrollPause();

        // hide app
        elements.app.classList.add("hide");

        return true;

    }



    /*** Custom Scroll ***/
    
    _scroll() {

        // get easing
        let ease = .1;
        if (app.os == 'macos') {
            if (!app.viewport.mobiledevice) {
                ease = .2;
            }
        }
        if (app.browser == 'edge') {
            ease = .2;
        }

        // get selector
        this._scrollEl = this._scrollSelector();

        // initialize scroll
        
        this.scroll = new Scroll({
            parent: this,
            selectors: {
                outer: '.scroll',
                elements: this._scrollEl
            },
            ease: ease,
            resizeTimeout: settings.resizeTimeout,
            run: false,
            resizeOnUpdate: false,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        run: false
                    }
                }
            ]
        });

        // resize run
        this._addEvent('viewport', {
            target: 'w_',
            do: () => {
                this.scrollPlay();
            }
        });

    }

    _scrollSelector() {

        return '.scroll .scroll__outer';

    }

    scrollPause() {

        this.scroll.changeProp({
            run: false
        });

    }

    scrollPlay() {

        // bool
        let play = true;
        if (app.viewport.mobiledevice || !app.viewport.desktop) {
            // play = false
        }

        if (play) {
            // play
            this.scroll.changeProp({
                run: true
            });
            // class
            this.scroll.outer.classList.remove("unactive");
        }
        else {
            // stop
            this.scroll.changeProp({
                run: false
            });
            // class
            this.scroll.outer.classList.add("unactive");
            // transforms
            let el = utils.elements(this._scrollEl);
            for (let i = 0; i < el.length; i++) {
                el[i].style.transform = '';
            }
        }

    }



    /*** View ***/

    _view() {

        this.view = view();

    }



    /*** Show/Hide Elements ***/

    _elements() {

        elementsUpdate();

        // make the logo inactive on the main page
        if (elements.logo) {
            if (this.prop.name == 'home') {
                elements.logo.style.pointerEvents = 'none';
            }
            else {
                elements.logo.style.pointerEvents = '';
            }
        }

    }



}

new Default({
    name: 'default'
});

export default Default;