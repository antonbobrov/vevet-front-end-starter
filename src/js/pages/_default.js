import { Page, Scroll, View } from '../modules/vevet';
import app from '../modules/app';
import settings from '../settings';
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

        // update view
        this.view.updateEl();
        this.view.seek();

        // enable scroll
        this.scrollPlay();

        // show app
        elements.get().app.classList.remove("hide");

        // show contents
        elements.get().scroll.classList.remove("hide");

    }

    // Hide the page

    hide() {

        super.hide();

        // stop scroll
        this.scrollPause();

        // hide app
        elements.get().app.classList.add("hide");

    }



    /*** Custom Scroll ***/

    _scroll() {

        let k = .1;
        if (app.os == 'macos') {
            k = .2;
        }

        // get selector
        this._scrollEl = '.scroll .scroll__outer';

        // get outer
        this._scrollOuter = document.querySelector('.scroll');

        // initialize scroll
        
        this.scroll = new Scroll({
            parent: this,
            selectors: {
                outer: '.scroll',
                elements: this._scrollEl
            },
            k: {
                value: k,
            },
            drag: {
                on: true,
                k: 2,
                reset: false,
                disableListeners: true,
                timeoutListeners: 10,
                min: 1
            },
            resizeTimeout: settings.resizeTimeout,
            run: false,
            resizeOnUpdate: false,
            roundPixel: app.browser == 'firefox',
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

    scrollPause() {

        this.scroll.changeProp({
            run: false
        });

    }

    scrollPlay() {

        // bool
        let play = true;
        if (app.viewport.mobiledevice || !app.viewport.desktop) {
            play = false
        }

        if (play) {
            // play
            this.scroll.changeProp({
                run: true
            });
            // class
            this._scrollOuter.classList.remove("unactive");
        }
        else {
            // stop
            this.scroll.changeProp({
                run: false
            });
            // class
            this._scrollOuter.classList.add("unactive");
            // transforms
            let el = document.querySelectorAll(this._scrollEl);
            for (let i = 0; i < el.length; i++) {
                el[i].style.transform = '';
            }
        }

    }



    /*** View ***/

    _view() {

        this.view = new View({
            parent: this,
            selectors: {
                outer: this.scroll,
                elements: '.v-view',
                inside: false
            },
            seekLoad: false,
            seekInit: false,
            classToAdd: 'v-viewed',
            stackDelay: 75,
            resizeTimeout: 1000,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        selectors: {
                            outer: '.scroll'
                        }
                    }
                },
                {
                    breakpoint: 'md',
                    settings: {
                        selectors: {
                            outer: '.scroll'
                        }
                    }
                }
            ]
        });

    }



    /*** Show/Hide Elements ***/

    _elements() {

        let el = elements.get();

        // make logo non-active on home page
        if (this.prop.name == 'home') {
            el.logo.style.pointerEvents = 'none';
        }
        else {
            el.logo.style.pointerEvents = '';
        }

    }



}

new Default({
    name: 'default'
});

export default Default;