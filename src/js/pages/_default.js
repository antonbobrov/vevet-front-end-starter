import { Page, Scroll, utils } from '../v/v';
import app from '../v/app';
import settings from '../settings';
import height from '../helpers/height';
import { elements, elementsUpdate } from '../helpers/elements';
import view from '../modules/scroll/view';



class Default extends Page {



    create(ajax) {

        if (!super.create(ajax)) {
            return false;
        }

        // set full height
        height.set();

        // scrolling
        this._scroll();
        this._view();

        // update page elements
        elementsUpdate();

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
            this.scrollPause();
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



}

new Default({
    name: 'default'
});

export default Default;