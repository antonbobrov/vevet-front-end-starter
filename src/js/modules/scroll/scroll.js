import settings from '../../settings';
import app from '../../v/app';
import { utils, Scroll } from 'vevet';


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
    const scrollEl = utils.elements('.scroll .scroll__outer');

    // initialize scroll
    
    const scroll = new Scroll({
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
    }

    // play scroll
    function play() {

        let viewport = app.viewport,
            scrollOuter = scroll.outer;

        // bool
        let play = true;
        if (viewport.mobiledevice || !viewport.desktop) {
            // play = false;
        }

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