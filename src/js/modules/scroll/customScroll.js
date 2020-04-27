import { resizeTimeout, useCustomScroll } from '../../settings';
import app from '../../v/app';
import { ScrollModule, ScrollBarPlugin } from 'vevet';
import scrollCanBeCustom from './scrollCanBeCustom';
import getCustomScrollElements from './getCustomScrollElements';
import getCustomScrollEase from './getCustomScrollEase';



let currentScrollModule = false;



const customScroll = (function() {

    return {
        get: getScroll.bind(this),
        create: createScroll.bind(this),
        pause: pause.bind(this),
        play: play.bind(this),
        toggle: toggleScroll.bind(this),
        playAndSetClasses: playAndSetClasses.bind(this)
    }

})();
window.customScroll = customScroll;

export default customScroll;




/**
 * @returns { ScrollModule | false } Returns the initialized module or false.
 */
function getScroll() {
    return currentScrollModule;
}

/**
 * @returns { ScrollModule | false } Returns the initialized module or false.
 */
function createScroll() {

    if (!useCustomScroll) {
        currentScrollModule = false;
        return false;
    }

    // initialize scroll
    const scroll = new ScrollModule({
        parent: app.vevetPage,
        selectors: {
            outer: '.scroll',
            elements: getCustomScrollElements()
        },
        ease: getCustomScrollEase(),
        willChange: true,
        resizeTimeout: resizeTimeout,
        run: false,
        responsive: [
            {
                breakpoint: 't',
                settings: {
                    run: false
                }
            }
        ]
    });

    // set scroll classes
    setScrollClasses(scroll, false);

    // add scrollbars
    scroll.addPlugin(new ScrollBarPlugin());

    // enable or disable scroll on resize
    app.vevetPage._addEvent('viewport', {
        target: 'w_',
        do: toggleScroll.bind(this, true)
    });

    // change var
    currentScrollModule = scroll;
    
    return scroll;

}



/**
 * @param { boolean } onResize 
 */
function toggleScroll(onResize = false) {

    // get scroll
    const scroll = getScroll();
    if (scroll) {

        // bool
        let playBool = scrollCanBeCustom();
        // either play or pause
        if (playBool) {
            scroll.outer.scrollTop = 0;
            scroll.outer.scrollLeft = 0;
            playPause(scroll, true);
        }
        else {
            playPause(scroll, false);
        }

        // classes
        if (onResize) {
            setScrollClasses(scroll, playBool);
        }

    }

}

/**
 * @param { ScrollModule } scroll 
 * @param { boolean } [bool] 
 */
function playPause(scroll, bool = true) {

    // change scroll properties
    scroll.changeProp({
        run: bool
    });

}

function pause() {
    if (!useCustomScroll || !scrollCanBeCustom()) {
        return false;
    }
    const scroll = getScroll();
    if (scroll) {
        playPause(scroll, false);
        return true;
    }
    return false;
}

function play() {
    if (!useCustomScroll || !scrollCanBeCustom()) {
        return false;
    }
    const scroll = getScroll();
    if (scroll) {
        playPause(scroll, true);
        return true;
    }
    return false;
}

function playAndSetClasses() {
    if (!useCustomScroll || !scrollCanBeCustom()) {
        return false;
    }
    const scroll = getScroll();
    if (scroll) {
        setScrollClasses(scroll, true);
        play();
        return true;
    }
    return false;
}



/**
 * @param { ScrollModule } scroll 
 * @param { boolean } bool 
 */
function setScrollClasses(scroll, bool) {

    // get scroll outer
    const scrollOuter = scroll.outer;
    // and scroll elements
    const elements = getCustomScrollElements();

    if (bool) {
        // classes
        scrollOuter.classList.remove("unactive");
    }
    else {
        // classes
        scrollOuter.classList.add("unactive");
        // transform
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.transform = '';
        }
    }

}