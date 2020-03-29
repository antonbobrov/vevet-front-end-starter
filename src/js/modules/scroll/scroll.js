import settings from '../../settings';
import app from '../../v/app';
import { ScrollModule, ScrollBarPlugin } from 'vevet';
import { all } from 'select-el';
import scrollCanBeCustom from './scrollCanBeCustom';



// the module lets elements animate when they appear into the viewport
function scroll() {

    let page = app.vevetPage;

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

    // get scrolling elements
    const scrollEl = all('.scroll .scroll__outer');

    // initialize scroll
    const scroll = new ScrollModule({
        parent: page,
        selectors: {
            outer: '.scroll',
            elements: scrollEl
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

    // add scrollbars
    scroll.addPlugin(new ScrollBarPlugin());

    // resize run
    page._addEvent('viewport', {
        target: 'w_',
        do: play.bind(this)
    });



    // run scroll
    function run(bool = true) {
        scroll.changeProp({
            run: bool
        });
    }

    // pause scroll
    function pause() {
        run(false);
        // remove a special class
        scrollEl.forEach(el => {
            el.classList.remove("custom");
        });
    }

    // play scroll
    function play() {

        let scrollOuter = scroll.outer;

        // bool
        let play = scrollCanBeCustom();

        // either play or stop
        if (play) {
            // play
            run();
            // class
            scrollOuter.classList.remove("unactive");
        }
        else {
            // stop
            pause();
            // class
            scrollOuter.classList.add("unactive");
            // transforms
            for (let i = 0; i < scrollEl.length; i++) {
                scrollEl[i].style.transform = '';
            }
        }

        // add a special class
        if (play) {
            scrollEl.forEach(el => {
                el.classList.add("custom");
            });
        }
        else {
            scrollEl.forEach(el => {
                el.classList.remove("custom");
            });
        }

    }



    // return info
    return {
        scroll: scroll,
        scrollEl: scrollEl,
        play: play.bind(this),
        run: run.bind(this),
        pause: pause.bind(this)
    };
    
}

export default scroll;